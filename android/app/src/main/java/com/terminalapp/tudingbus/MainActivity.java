package com.terminalapp.tudingbus;

import android.view.View;
import android.widget.LinearLayout;

import com.reactnativenavigation.controllers.SplashActivity;

public class MainActivity extends SplashActivity {

//    /**
//     * Returns the name of the main component registered from JavaScript.
//     * This is used to schedule rendering of the component.
//     */
//    @Override
//    protected String getMainComponentName() {
//        return "tuding";
//    }
    @Override
    public LinearLayout createSplashLayout() {
        View decorView = getWindow().getDecorView();
        // Hide the status bar.
        int uiOptions = View.SYSTEM_UI_FLAG_FULLSCREEN;
        decorView.setSystemUiVisibility(uiOptions);

        LinearLayout view = new LinearLayout(this);
        view.setBackground(getResources().getDrawable(R.drawable.splash_screen));
        return view;
    }

}
