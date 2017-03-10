import { Component } from '@angular/core';
import { NavController, ViewController,  ModalController, LoadingController, AlertController } from 'ionic-angular';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { RegisterPage } from '../register/register';
import { TabsPage } from '../tabs/tabs';

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

    email: string;
    password: string;

    constructor(
        public navCtrl: NavController,
        public viewCtrl: ViewController,
        private modalCtrl: ModalController,
        public loadingCtrl: LoadingController,
        private alertCtrl: AlertController,
        public af: AngularFire ) {}

    submitLogin() {
      if (this.email && this.password) {

          let loader = this.loadingCtrl.create({ dismissOnPageChange: true });
          loader.present();

          this.af.auth.login({
              email: this.email,
              password: this.password
          },
          {
              provider: AuthProviders.Password,
              method: AuthMethods.Password
          }).then( authData => {
              this.navCtrl.setRoot(TabsPage);
          }, error => {
              loader.dismiss();
              let alert = this.alertCtrl.create({
                title: 'Notification',
                message: error.message,
                buttons: ['Ok']
              });
              alert.present();
          });

      } else {

          let alert = this.alertCtrl.create({
            title: 'Notification',
            message: 'Fill in the form please',
            buttons: ['Ok']
          });
          alert.present();
      }

  }

  submitRegister() {
      let registerModal = this.modalCtrl.create(RegisterPage);
      registerModal.present();
  }

}
