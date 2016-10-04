package com.binger.binger;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.support.v7.app.AppCompatActivity;

public class RestaurantDetailScreen extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_restaurant_detail_screen);

        Button button1 = (Button)findViewById(R.id.cancel_button);
        button1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                finish();
            }
        });

        Button button2 = (Button)findViewById(R.id.To_Queue_button);

        Button button3 = (Button)findViewById(R.id.Maps_button);
    }

}
