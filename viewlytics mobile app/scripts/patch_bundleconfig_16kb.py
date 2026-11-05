#!/usr/bin/env python3
"""
Patch BundleConfig.pb inside an AAB to add PAGE_ALIGNMENT_16K to
UncompressNativeLibraries. Required for Google Play 16KB page size
compliance when using AGP < 8.5 (whose bundletool predates this field).

Protobuf schema (from google/bundletool config.proto):
  Optimizations.uncompress_native_libraries (field 2) = {
    enabled (field 1): bool
    alignment (field 2): enum PageAlignment { 16K = 2 }
  }

Before: 12 02 08 01           → { enabled: true }
After:  12 04 08 01 10 02     → { enabled: true, alignment: PAGE_ALIGNMENT_16K }
"""
import sys
import os
import zipfile


def patch_bundleconfig(data: bytes) -> bytes:
    NEW = b'\x12\x04\x08\x01\x10\x02'

    if NEW in data:
        print("  BundleConfig.pb is already patched with PAGE_ALIGNMENT_16K")
        return data

    OLD_UNCOMPRESSED = b'\x12\x02\x08\x01'
    OLD_EMPTY = b'\x12\x00'

    if OLD_UNCOMPRESSED in data:
        target = OLD_UNCOMPRESSED
        added_bytes = 2
    elif OLD_EMPTY in data:
        target = OLD_EMPTY
        added_bytes = 4
    else:
        print("  WARNING: UncompressNativeLibraries pattern not found in BundleConfig.pb")
        print("  The BundleConfig may already be patched or has an unexpected structure.")
        return data

    pos = data.index(target)
    patched = data[:pos] + NEW + data[pos + len(target):]

    # Now fix the Optimizations message length. It's encoded as:
    # 0x12 <varint_length> <body...>
    # We need to find it. It should be before `pos` and its body should span `pos`.
    # Walk from the start to find field 2 (tag 0x12) at the top level of BundleConfig.
    i = 0
    ba = bytearray(patched)
    while i < len(ba):
        tag = ba[i]
        field_num = tag >> 3
        wire_type = tag & 0x07
        i += 1
        if wire_type == 2:  # length-delimited
            # Read varint length
            length = 0
            shift = 0
            len_start = i
            while i < len(ba):
                b = ba[i]
                i += 1
                length |= (b & 0x7f) << shift
                shift += 7
                if not (b & 0x80):
                    break
            len_end = i
            body_start = i
            body_end = i + length

            if field_num == 2 and body_start <= pos < body_end:
                # This is the Optimizations field containing our patch.
                new_length = length + added_bytes
                # Re-encode the varint length
                new_len_bytes = []
                val = new_length
                while val > 0x7f:
                    new_len_bytes.append((val & 0x7f) | 0x80)
                    val >>= 7
                new_len_bytes.append(val)

                old_len_bytes_count = len_end - len_start
                new_len_bytes_count = len(new_len_bytes)

                ba = (ba[:len_start] +
                      bytes(new_len_bytes) +
                      ba[len_end:])

                # If the varint length encoding changed size, adjust pos
                # (shouldn't happen for small lengths, but be safe)
                break

            i = body_end
        elif wire_type == 0:  # varint
            while i < len(ba) and ba[i] & 0x80:
                i += 1
            i += 1
        elif wire_type == 1:  # 64-bit
            i += 8
        elif wire_type == 5:  # 32-bit
            i += 4

    return bytes(ba)


def patch_aab(src_path, dst_path):
    with zipfile.ZipFile(src_path, 'r') as zin:
        with zipfile.ZipFile(dst_path, 'w', allowZip64=True) as zout:
            for info in zin.infolist():
                data = zin.read(info.filename)
                if info.filename == 'BundleConfig.pb':
                    data = patch_bundleconfig(data)
                    print(f"  patched BundleConfig.pb (+PAGE_ALIGNMENT_16K)")
                zout.writestr(info, data)
    print(f"  output: {os.path.basename(dst_path)}")


if __name__ == '__main__':
    if len(sys.argv) != 3:
        print(f"Usage: {sys.argv[0]} <input.aab> <output.aab>")
        sys.exit(1)
    patch_aab(sys.argv[1], sys.argv[2])
