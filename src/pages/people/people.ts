import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire } from 'angularfire2';
import { Observable } from 'rxjs';
import { PersonPage } from '../person/person';
import { PrivatPage } from '../privat/privat';

/*
  Generated class for the People page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-people',
  templateUrl: 'people.html'
})
export class PeoplePage {

    people: Observable<any>;

    constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire) {}

    ngOnInit() {
        this.af.auth.subscribe(user => {
            if(user) {
                this.people = this.af.database.list(`/people`).map(items => {
                    const filtered = items.filter(item => item.$key != user.auth.uid);
                    return filtered;
                });
            }
        });
    }

    routPerson(id) {
        this.navCtrl.push(PersonPage, {
            id: id
        });
    }
    massagePerson(id) {
        this.navCtrl.push(PrivatPage, {
            id: id
        });
    }

}
