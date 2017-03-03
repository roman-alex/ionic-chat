import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase';

/*
  Generated class for the UsersService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UsersService {

    defaultImg: string = 'https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg' ;
    public userProfile: any;

    constructor(public http: Http) {
        this.userProfile = firebase.database().ref('people');
    }

    signUpUser( email: string, password: string, user: string, telSet: string, birthSet: string, townSet: string, workSet: string, stadySet: string) {
        return firebase.auth().createUserWithEmailAndPassword(email, password).then( newUser => {
            firebase.auth().signInWithEmailAndPassword(email, password).then( authenticatedUser => {
                this.userProfile.child(authenticatedUser.uid).set({
                    img: this.defaultImg,
                    user: user,
                    email: email,
                    telSet: telSet,
                    birthSet: birthSet,
                    townSet: townSet,
                    workSet: workSet,
                    stadySet: stadySet,
                    providerId: 'password'
                })
            })
        });
    }

    signInUser( email: string, password: string ) {
        return firebase.auth().signInWithEmailAndPassword(email, password);
    }

    logoutUser() {
        return firebase.auth().signOut();
    }

}
