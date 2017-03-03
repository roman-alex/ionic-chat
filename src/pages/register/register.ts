import { Component } from '@angular/core';
import { NavController, ViewController, LoadingController, AlertController } from 'ionic-angular';
import { UsersService } from '../../providers/users-service';
import { TabsPage } from '../tabs/tabs';

/*
  Generated class for the Register page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
  providers: [ UsersService ]
})
export class RegisterPage {

    user: string;
    email: string;
    telSet: string;
    birthSet: string;
    townSet: string;
    workSet: string;
    stadySet: string;
    password: string;

    constructor(
        public navCtrl: NavController,
        public viewCtrl: ViewController,
        private usersService: UsersService,
        public loadingCtrl: LoadingController,
        private alertCtrl: AlertController ) {}

    closeRegesterPage() {
        this.viewCtrl.dismiss();
    }

    signUserUp() {
        if (this.email && this.password && this.user && this.telSet && this.birthSet && this.townSet && this.workSet && this.stadySet) {

            let loader = this.loadingCtrl.create({ dismissOnPageChange: true });
            loader.present();

            this.usersService.signUpUser(this.email, this.password, this.user, this.telSet, this.birthSet, this.townSet, this.workSet, this.stadySet)
                .then( authData => {
                    this.viewCtrl.dismiss();
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

}
