import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content } from 'ionic-angular';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

/*
  Generated class for the Privat page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-privat',
  templateUrl: 'privat.html'
})
export class PrivatPage {

    id: any;

    itemsInterlocutor: FirebaseListObservable<any>;
    itemInfo: FirebaseObjectObservable<any>;
    itemInterlocutorChatInfo: FirebaseObjectObservable<any>;
    itemChatInfo: FirebaseObjectObservable<any>;
    itemInterlocutorChatDate: FirebaseObjectObservable<any>;
    itemChatDate: FirebaseObjectObservable<any>;
    items: FirebaseListObservable<any>;
    userInfoSet: FirebaseListObservable<any>;
    newMessage: string = '';
    user = <any>{};
    itemInfoUser: string = '';
    itemInfoImg: string = '';
    storageRef: any;
    sendInput: any;
    itemChatInfoUser: string = '';

    constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire) {}

    @ViewChild(Content) content: Content;

    ionViewDidEnter(){
        this.content.scrollToBottom(0);
    }

    ngAfterViewChecked() {
        this.content.scrollToBottom(0);
    }

    ngOnInit() {
        this.id = this.navParams.get('id');

        this.af.auth.subscribe(user => {
          if(user) {
            this.user.id = user.auth.uid;

            this.userInfoSet = this.af.database.list(`/people/${user.auth.uid}`, { preserveSnapshot: true });
            this.userInfoSet.subscribe(snapshots => {
                snapshots.forEach(snapshot => {
                    if (snapshot.key == 'user') {
                        this.user.name = snapshot.val() || 'error';
                    }
                    if (snapshot.key == 'img') {
                        this.user.img = snapshot.val() || 'error';
                    }
                });
            });

            this.itemChatInfo = this.af.database.object(`/people/${this.user.id}/privatChats/${this.id}/info`, { preserveSnapshot: true });
            this.itemChatInfo.subscribe(snapshots => {
                snapshots.forEach(snapshot => {
                    if (snapshot.key == 'user') {
                        this.itemChatInfoUser = snapshot.val() || 'error';
                    }
                });
            });

            this.itemChatDate = this.af.database.object(`/people/${this.user.id}/privatChats/${this.id}`);
            this.itemInterlocutorChatDate = this.af.database.object(`/people/${this.id}/privatChats/${this.user.id}`);
            this.itemInterlocutorChatInfo = this.af.database.object(`/people/${this.id}/privatChats/${this.user.id}/info`);
            this.itemInfo = this.af.database.object(`/people/${this.id}`, { preserveSnapshot: true });
            this.itemsInterlocutor = this.af.database.list(`/people/${this.id}/privatChats/${this.user.id}/chat`);
            this.items = this.af.database.list(`/people/${this.user.id}/privatChats/${this.id}/chat`);

            this.itemInterlocutorChatInfo.update({
                user: this.user.name,
                img: this.user.img
            });

            this.itemInfo.subscribe(
                val => {
                    this.itemInfoUser =  val.val().user;
                    this.itemInfoImg = val.val().img;
                    this.itemChatInfo.update({
                        user: this.itemInfoUser,
                        img: this.itemInfoImg
                    });
                }
            );
            this.itemChatInfo.update({
                read: true
            });
          }
        });
    }

    sendMessage() {
        if (this.sendInput != '') {
            this.itemPush();
            this.sendInput = '';
        } else {
            alert('Введите сообщение');
        }
    }

    deleteItem(key: string) {
        this.itemsInterlocutor.remove(key);
        this.items.remove(key);
    }

    itemPush() {
        this.inspectionInput('http://');
        this.inspectionInput('https://');
        this.itemsInterlocutor.push({
            text: this.sendInput,
            user: this.user.name,
            img: this.user.img,
            uid: this.user.id,
            data: Date.now()
        });
        this.items.push({
            text: this.sendInput,
            user: this.user.name,
            img: this.user.img,
            uid: this.user.id,
            data: Date.now()
        });
        this.itemInterlocutorChatInfo.update({
            read: false,
            lastMessage : this.sendInput,
            lastMessageImg : this.user.img
        });
        this.itemChatInfo.update({
            lastMessage : this.sendInput,
            lastMessageImg : this.user.img,
            read: true
        });
        this.itemChatDate.update({
            date: 0 - Date.now()
        });
        this.itemInterlocutorChatDate.update({
            date: 0 - Date.now()
        });
    }

    inspectionInput(val) {
        let message: string = this.sendInput;
        if ( message.indexOf('<iframe') != -1) {
                this.sendInput = 'Я Олень, який хотів добавити <b>iframe</b> і положити сайт. Але Рома вже пофіксив цей баг';
        } else if ( message.indexOf(val) != -1 && message.indexOf('<img') == -1) {
            let arr = message.split(' ');
            for (let i = 0; i < arr.length; i++) {
                if ( arr[i].indexOf(val) != -1 ) {
                    arr[i] = `<a href="${arr[i]}" target="_blank">${arr[i]}</a>`
                }
            }
            this.sendInput = arr.join(' ');
        }
    }

}
