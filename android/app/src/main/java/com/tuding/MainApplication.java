package com.tuding;

import android.app.Application;

import com.reactnativenavigation.NavigationApplication;
import com.airbnb.android.react.maps.MapsPackage;

// import com.facebook.react.ReactApplication;
import com.oblador.vectoricons.VectorIconsPackage;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
 import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.database.RNFirebaseDatabasePackage;
import io.invertase.firebase.auth.RNFirebaseAuthPackage;

public class MainApplication extends NavigationApplication {

//  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
//    @Override
//    public boolean getUseDeveloperSupport() {
//      return BuildConfig.DEBUG;
//    }

//    protected List<ReactPackage> getPackages() {
//      return Arrays.<ReactPackage>asList(
//
//      );
//    }

////    @Override
//    public String getJSMainModuleName() {
//      return "index";
//    }

//  @Override
//  public ReactNativeHost getReactNativeHost() {
//    return mReactNativeHost;
//  }

//  @Override
//  public void onCreate() {
//    super.onCreate();
//    SoLoader.init(this, /* native exopackage */ false);
//  }
 
  @Override
  public List<ReactPackage> createAdditionalReactPackages() {
    return Arrays.<ReactPackage>asList(
        new VectorIconsPackage(),
        new ReactNativeConfigPackage(),
        new RNFirebasePackage(),
        new RNFirebaseDatabasePackage(),
        new RNFirebaseAuthPackage(),
        new MainReactPackage(),
        new MapsPackage()
    );
  }

  @Override
  public boolean isDebug() {
      return BuildConfig.DEBUG;
  }
}
