import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UsersService } from '../../providers/users-service';
import { LoginPage } from '../login/login';
import 'rxjs/add/operator/map';
import { AngularFire, FirebaseObjectObservable} from 'angularfire2';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [ UsersService ]
})
export class HomePage {

    person: FirebaseObjectObservable<any>;

    constructor(public navCtrl: NavController, private usersService: UsersService, public af: AngularFire) {
        this.af.auth.subscribe(user => {
          if(user) {
            this.person = this.af.database.object(`/people/${user.auth.uid}`);
          }
        });
    }

    logoutUser() {
      this.af.auth.logout().then( () => {
          this.navCtrl.setRoot(LoginPage);
      });
    }

}
