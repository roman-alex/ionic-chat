import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import * as firebase from 'firebase';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

    public rootPage: any = TabsPage;

    constructor(platform: Platform) {
        var config = {
            apiKey: "AIzaSyAZ-DXzGDQsemHEzEadlnXaUDSGpu0Set0",
            authDomain: "testchat-483ef.firebaseapp.com",
            databaseURL: "https://testchat-483ef.firebaseio.com",
            storageBucket: "testchat-483ef.appspot.com",
            messagingSenderId: "58755040264"
        };
        firebase.initializeApp(config);

        firebase.auth().onAuthStateChanged( user => {
            if(!user) {
                this.rootPage = LoginPage;
            }
        });

        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            StatusBar.styleDefault();
            Splashscreen.hide();
        });
    }
}
