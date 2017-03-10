import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { PersonPage } from '../pages/person/person';
import { PrivatPage } from '../pages/privat/privat';
import { TabsPage } from '../pages/tabs/tabs';
import { PeoplePage } from '../pages/people/people';
import { MessagesPage } from '../pages/messages/messages';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { AngularFireModule } from 'angularfire2';

export const firebaseConfig = {
    apiKey: "AIzaSyAZ-DXzGDQsemHEzEadlnXaUDSGpu0Set0",
    authDomain: "testchat-483ef.firebaseapp.com",
    databaseURL: "https://testchat-483ef.firebaseio.com",
    storageBucket: "testchat-483ef.appspot.com",
    messagingSenderId: "58755040264"
};

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    PeoplePage,
    PersonPage,
    LoginPage,
    RegisterPage,
    TabsPage,
    MessagesPage,
    PrivatPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    PeoplePage,
    PersonPage,
    LoginPage,
    RegisterPage,
    TabsPage,
    MessagesPage,
    PrivatPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
