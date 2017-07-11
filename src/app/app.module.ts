import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PersonPage } from '../pages/person/person';
import { PrivatPage } from '../pages/privat/privat';
import { TabsPage } from '../pages/tabs/tabs';
import { PeoplePage } from '../pages/people/people';
import { MessagesPage } from '../pages/messages/messages';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { SettingPage } from '../pages/setting/setting';
import { AngularFireModule } from 'angularfire2';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';

export const firebaseConfig = {
    apiKey: "AIzaSyAZ-DXzGDQsemHEzEadlnXaUDSGpu0Set0",
    authDomain: "testchat-483ef.firebaseapp.com",
    databaseURL: "https://testchat-483ef.firebaseio.com",
    storageBucket: "testchat-483ef.appspot.com",
    messagingSenderId: "58755040264"
};

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': 'd4149dfb'
  }
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PeoplePage,
    PersonPage,
    LoginPage,
    RegisterPage,
    TabsPage,
    MessagesPage,
    PrivatPage,
    SettingPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PeoplePage,
    PersonPage,
    LoginPage,
    RegisterPage,
    TabsPage,
    MessagesPage,
    PrivatPage,
    SettingPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
