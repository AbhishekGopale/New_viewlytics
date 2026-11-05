package com.idonneous.viewlytics;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import androidx.core.content.FileProvider;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import java.io.File;

public class NativeShareModule extends ReactContextBaseJavaModule {
    private final ReactApplicationContext reactContext;

    public NativeShareModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "NativeShare";
    }

    @ReactMethod
    public void shareImage(ReadableMap options, Promise promise) {
        try {
            String url = options.hasKey("url")
                ? options.getString("url")
                : (options.hasKey("filePath") ? options.getString("filePath") : "");
            String message = options.hasKey("message")
                ? options.getString("message")
                : (options.hasKey("text") ? options.getString("text") : "");
            String title = options.hasKey("title")
                ? options.getString("title")
                : (options.hasKey("dialogTitle") ? options.getString("dialogTitle") : "Visit Proof");

            if (url == null || url.isEmpty()) {
                promise.reject("NO_URL", "No image URL provided");
                return;
            }

            Uri uri;
            if (url.startsWith("content://")) {
                uri = Uri.parse(url);
            } else {
                String filePath = url.startsWith("file://") ? url.substring(7) : url;
                File file = new File(filePath);
                try {
                    uri = FileProvider.getUriForFile(
                        reactContext,
                        reactContext.getPackageName() + ".fileprovider",
                        file
                    );
                } catch (Exception e) {
                    try {
                        uri = FileProvider.getUriForFile(
                            reactContext,
                            reactContext.getPackageName() + ".provider",
                            file
                        );
                    } catch (Exception ex) {
                        uri = Uri.fromFile(file);
                    }
                }
            }

            Intent intent = new Intent(Intent.ACTION_SEND);
            intent.setType("image/png");
            intent.putExtra(Intent.EXTRA_STREAM, uri);
            if (message != null && !message.isEmpty()) {
                intent.putExtra(Intent.EXTRA_TEXT, message);
            }
            intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);

            Intent chooser = Intent.createChooser(intent, title);
            chooser.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            chooser.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);

            Activity currentActivity = getCurrentActivity();
            if (currentActivity != null) {
                currentActivity.startActivity(chooser);
            } else {
                reactContext.startActivity(chooser);
            }

            promise.resolve(true);
        } catch (Exception e) {
            promise.reject("SHARE_ERROR", e.getMessage());
        }
    }
}
