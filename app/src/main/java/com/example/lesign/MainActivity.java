package com.example.lesign;

import android.os.Bundle;
import android.webkit.WebView;

import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        WebView map = findViewById(R.id.map);

        map.getSettings().setJavaScriptEnabled(true);
        map.getSettings().setJavaScriptCanOpenWindowsAutomatically(true);

        map.loadUrl("file:///android_asset/html/map.html");
    }


}