package com.binger.binger;

import android.content.Intent;
import android.media.Image;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.view.Menu;
import android.view.MenuItem;
import android.view.ViewGroup;
import android.widget.ImageSwitcher;
import android.widget.ImageView;
import android.widget.ViewSwitcher;

public class MainScreen extends AppCompatActivity {

    //add image to drawable and fetch here
    int imageNo[] = {R.drawable.food1, R.drawable.food2, R.drawable.food3, R.drawable.food4};

    //counting image
    int countImage = imageNo.length;

    //get the position of image in display
    int currentImage = 0;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main_screen);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        final ImageSwitcher imageSwitcher = (ImageSwitcher) findViewById(R.id.images);
        imageSwitcher.setFactory(new ViewSwitcher.ViewFactory() {
            @Override
            public View makeView() {
                ImageView imageView = new ImageView(getApplicationContext());
                imageView.setScaleType(ImageView.ScaleType.FIT_CENTER);
                imageView.setLayoutParams(new ImageSwitcher.LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT));
                return imageView;
            }
        });

        FloatingActionButton fab1 = (FloatingActionButton) findViewById(R.id.red);
        fab1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                //now set the code to change images as per rule


                if(currentImage == countImage)
                    currentImage = 0;

                //show the image in imageswitcher
                imageSwitcher.setImageResource(imageNo[currentImage]);
                currentImage++;
            }
        });

        FloatingActionButton fab2 = (FloatingActionButton) findViewById(R.id.green);
        fab2.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent i = new Intent(MainScreen.this, RestaurantDetailScreen.class);
                startActivity(i);
            }
        });
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_main_screen, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_login)
            return true;
        else if (id == R.id.action_deals)
            return true;
        else if (id == R.id.action_settings)
            return true;
        else if (id == R.id.action_tutorial)
            return true;
        else if (id == R.id.action_logout)
            return true;
        else if (id == R.id.action_list)
            return true;

        return super.onOptionsItemSelected(item);
    }
}
