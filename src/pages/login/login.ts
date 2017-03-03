import { Component } from '@angular/core';
import { NavController,  ModalController, LoadingController, AlertController } from 'ionic-angular';
import { UsersService } from '../../providers/users-service';
import { RegisterPage } from '../register/register';
import { TabsPage } from '../tabs/tabs';

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [ UsersService ]
})
export class LoginPage {

    email: string;
    password: string;

    constructor(
        public navCtrl: NavController,
        private modalCtrl: ModalController,
        public loadingCtrl: LoadingController,
        private usersService: UsersService,
        private alertCtrl: AlertController ) {}

    submitLogin() {
      if (this.email && this.password) {

          let loader = this.loadingCtrl.create({ dismissOnPageChange: true });
          loader.present();

          this.usersService.signInUser(this.email, this.password)
              .then( authData => {
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
