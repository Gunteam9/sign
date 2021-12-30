package com.example.lesign;

import android.os.Bundle;
import android.webkit.GeolocationPermissions;
import android.webkit.WebChromeClient;
import android.webkit.WebView;

import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        WebView map = new WebView(this);

        map.getSettings().setJavaScriptEnabled(true);
        map.getSettings().setAppCacheEnabled(false);
        map.getSettings().setJavaScriptCanOpenWindowsAutomatically(true);

        map.setWebChromeClient(new WebChromeClient() {
            public void onGeolocationPermissionsShowPrompt(String origin, GeolocationPermissions.Callback callback) {
                callback.invoke(origin, true, false);
            }
        });

        map.loadUrl("file:///android_asset/html/test.html");

        setContentView(map);



    }
}