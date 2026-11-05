package com.idonneous.viewlytics;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactActivityDelegate;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "Viewlytics";
  }

  /**
   * Returns the instance of the {@link ReactActivityDelegate}. Here we use a util class {@link
   * DefaultReactActivityDelegate} which allows you to easily enable Fabric and Concurrent React
   * (aka React 18) with two boolean flags.
   */
  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new DefaultReactActivityDelegate(
        this,
        getMainComponentName(),
        // If you opted-in for the New Architecture, we enable the Fabric Renderer.
        DefaultNewArchitectureEntryPoint.getFabricEnabled(), // fabricEnabled
        // If you opted-in for the New Architecture, we enable Concurrent React (i.e. React 18).
        DefaultNewArchitectureEntryPoint.getConcurrentReactEnabled() // concurrentRootEnabled
        );
  }

  @Override
  public android.content.Intent registerReceiver(android.content.BroadcastReceiver receiver, android.content.IntentFilter filter) {
    if (android.os.Build.VERSION.SDK_INT >= 34 && getApplicationInfo().targetSdkVersion >= 34) {
      return super.registerReceiver(receiver, filter, android.content.Context.RECEIVER_EXPORTED);
    } else {
      return super.registerReceiver(receiver, filter);
    }
  }

  @Override
  public android.content.Intent registerReceiver(android.content.BroadcastReceiver receiver, android.content.IntentFilter filter, int flags) {
    if (android.os.Build.VERSION.SDK_INT >= 34 && getApplicationInfo().targetSdkVersion >= 34) {
      return super.registerReceiver(receiver, filter, flags | android.content.Context.RECEIVER_EXPORTED);
    } else {
      return super.registerReceiver(receiver, filter, flags);
    }
  }
}

