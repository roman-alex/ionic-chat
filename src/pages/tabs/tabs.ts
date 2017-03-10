import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { HomePage } from '../home/home';
import { PeoplePage } from '../people/people';
import { MessagesPage } from '../messages/messages';

@Component({
    templateUrl: 'tabs.html'
})
export class TabsPage {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    tab1Root: any = HomePage;
    tab2Root: any = PeoplePage;
    tab3Root: any = MessagesPage;

    chatSubscribe: FirebaseListObservable<any>;
    countMessage: number = 0;

    constructor(public af: AngularFire) {}

    ngOnInit() {
        this.af.auth.subscribe(user => {
          if(user) {
            // уведомления о сообщениях
            this.chatSubscribe = this.af.database.list(`/people/${user.auth.uid}/privatChats`, { preserveSnapshot: true });
            this.chatSubscribe.subscribe(snapshots => {
                snapshots.forEach(snapshot => {
                    let count = 0;
                    if (snapshot.val().info.read == false ) {
                        ++count;
                    }
                    this.countMessage = count;
                });
            });
          }
        });
    }
}
