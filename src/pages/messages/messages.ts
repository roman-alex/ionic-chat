import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire } from 'angularfire2';
import { Observable } from 'rxjs';
import { PrivatPage } from '../privat/privat';

/*
  Generated class for the Messages page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html'
})
export class MessagesPage {

    people: Observable<any>;

    constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire) {}

    ngOnInit() {
        this.af.auth.subscribe(user => {
          if(user) {
            this.people = this.af.database.list(`/people/${user.auth.uid}/privatChats/`, {
              query: {
                orderByChild: 'date'
              }
            }).map(items => {
                const filtered = items.filter(item => item.date != undefined);
                return filtered;
            });
          }
        });
    }
    massagePerson(id) {
        this.navCtrl.push(PrivatPage, {
            id: id
        });
    }

}
