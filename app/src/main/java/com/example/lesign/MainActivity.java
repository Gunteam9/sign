package com.example.lesign;

import android.os.Bundle;
import android.util.Log;
import android.webkit.ConsoleMessage;
import android.webkit.GeolocationPermissions;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;

import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        WebView map = (WebView) findViewById(R.id.map);

        map.setWebChromeClient(new WebChromeClient() {
            @Override
            public boolean onConsoleMessage(ConsoleMessage consoleMessage) {
                Log.d("MyApplication", consoleMessage.message() + " -- From line " +
                        consoleMessage.lineNumber() + " of " + consoleMessage.sourceId());
                return true;
            }

            public void onGeolocationPermissionsShowPrompt(String origin, GeolocationPermissions.Callback callback) {
                callback.invoke(origin, true, false);
            }
        });

        map.getSettings().setDomStorageEnabled(true);
        map.getSettings().setJavaScriptEnabled(true);
        map.getSettings().setAppCacheEnabled(true);
        map.getSettings().setMixedContentMode(WebSettings.MIXED_CONTENT_ALWAYS_ALLOW);
        map.getSettings().setGeolocationEnabled(true);
        map.getSettings().setAppCachePath(getApplicationContext().getCacheDir().getPath());
        map.getSettings().setCacheMode(WebSettings.LOAD_DEFAULT);

        map.loadUrl("file:///android_asset/html/map.html");
    }


}