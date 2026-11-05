# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /usr/local/Cellar/android-sdk/24.3.3/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# Add any project specific keep options here:

# React Native Core & Hermes
-keep class com.facebook.react.** { *; }
-keep class com.facebook.hermes.** { *; }
-keep class com.facebook.jni.** { *; }
-keepclassmembers class * {
    @com.facebook.react.uimanager.annotations.ReactProp <methods>;
    @com.facebook.react.uimanager.annotations.ReactPropGroup <methods>;
}

# App Native Modules & Activities
-keep class com.idonneous.viewlytics.** { *; }

# ViewShot (Proof card snapshots)
-keep class fr.greweb.reactnativeviewshot.** { *; }

# Image Picker / Crop Picker
-keep class com.reactnative.ivpusic.imagepicker.** { *; }
-keep class com.imagepicker.** { *; }

# Firebase & Push Notifications
-dontwarn com.google.firebase.**
-keep class com.google.firebase.** { *; }
-keep class io.invertase.firebase.** { *; }
-keep class com.dieam.reactnativepushnotification.** { *; }

# Navigation & Screens
-keep class com.swmansion.rnscreens.** { *; }
-keep class com.swmansion.gesturehandler.** { *; }

# AsyncStorage & NetInfo
-keep class com.reactnativecommunity.asyncstorage.** { *; }
-keep class com.reactnativecommunity.netinfo.** { *; }

