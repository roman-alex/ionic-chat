import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';

/*
  Generated class for the Person page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-person',
  templateUrl: 'person.html'
})
export class PersonPage {

    id: any;
    person: FirebaseObjectObservable<any>;

    constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire) {}

    ngOnInit() {
        this.id = this.navParams.get('id');
        this.person = this.af.database.object(`/people/${this.id}`);
    }

}
