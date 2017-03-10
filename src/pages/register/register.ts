import { Component } from '@angular/core';
import { NavController, ViewController, LoadingController, AlertController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';

/*
  Generated class for the Register page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

    person: FirebaseObjectObservable<any>;
    defaultImg: string = 'https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg' ;
    userEmail: string;
    userPassword: string;
    userUser: string;
    userTelSet: string;
    userBirthSet: string;
    userTownSet: string;
    userWorkSet: string;
    userStadySet: string;
    valid: boolean = false;

    constructor(
        public navCtrl: NavController,
        public viewCtrl: ViewController,
        public loadingCtrl: LoadingController,
        private alertCtrl: AlertController,
        public af: AngularFire ) {
            this.af.auth.subscribe(user => {
              if(user) {
                this.person = this.af.database.object(`/people/${user.auth.uid}`);
              }
            });
        }

    closeRegesterPage() {
        this.viewCtrl.dismiss();
    }

    createUser() {
        if ( this.userEmail && this.userPassword && this.userUser && this.userTelSet && this.userBirthSet && this.userTownSet && this.userWorkSet && this.userStadySet) {
            let loader = this.loadingCtrl.create({ dismissOnPageChange: true });
            loader.present();

            this.af.auth.createUser({
                email: this.userEmail,
                password: this.userPassword
            }).then( authData => {
                this.person.update({
                    img: this.defaultImg,
                    user: this.userUser,
                    telSet: this.userTelSet,
                    emailSet: this.userEmail,
                    birthSet: this.userBirthSet,
                    townSet: this.userTownSet,
                    workSet: this.userWorkSet,
                    stadySet: this.userStadySet,
                    providerId: 'password'
                });
                this.viewCtrl.dismiss();
                loader.dismiss();
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
            console.log(this.userEmail)

            let alert = this.alertCtrl.create({
              title: 'Notification',
              message: 'Fill in the form please',
              buttons: ['Ok']
            });
            alert.present();
        }
    }

}
