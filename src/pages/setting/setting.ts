import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { AngularFire, FirebaseObjectObservable} from 'angularfire2';

/*
  Generated class for the Setting page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-setting',
    templateUrl: 'setting.html'
})
export class SettingPage {

    constructor(public navCtrl: NavController, public viewCtrl: ViewController, public navParams: NavParams, public af: AngularFire) {}

    person: FirebaseObjectObservable<any>;
    user = <any>{};

    ngOnInit() {
        this.af.auth.subscribe(user => {
            if(user) {
                this.person = this.af.database.object(`/people/${user.auth.uid}`, { preserveSnapshot: true });
                this.person.subscribe(snapshots => {
                    snapshots.forEach(snapshot => {
                        if (snapshot.key == 'telSet') {
                            this.user.telSet = snapshot.val() || 'error';
                        }
                        if (snapshot.key == 'emailSet') {
                            this.user.emailSet = snapshot.val() || 'error';
                        }
                        if (snapshot.key == 'birthSet') {
                            this.user.birthSet = snapshot.val() || 'error';
                        }
                        if (snapshot.key == 'townSet') {
                            this.user.townSet = snapshot.val() || 'error';
                        }
                        if (snapshot.key == 'workSet') {
                            this.user.workSet = snapshot.val() || 'error';
                        }
                        if (snapshot.key == 'stadySet') {
                            this.user.stadySet = snapshot.val() || 'error';
                        }
                    });
                });
            }
        });
    }

    settingSet() {
        this.person.update({
            telSet: this.user.telSet,
            emailSet: this.user.emailSet,
            birthSet: this.user.birthSet,
            townSet: this.user.townSet,
            workSet: this.user.workSet,
            stadySet: this.user.stadySet
        });
        this.viewCtrl.dismiss();
    }
    settingCencel() {
        this.viewCtrl.dismiss();
    }

}
