import { Component } from '@angular/core';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { Chat } from 'src/interface/chat';
import { Database, getDatabase, ref, set, onValue, query, orderByChild, equalTo, DataSnapshot, push, get } from "firebase/database";
import { environment } from 'src/environments/environment.development';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';


export const snapshotToArray = (snapshot: any) => {
  const returnArr: any[] = [];

  snapshot.forEach((childSnapshot: any) => {
      const item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnArr.push(item);
  });

  return returnArr;
};

@Component({
  selector: 'app-roomlist',
  templateUrl: './roomlist.component.html',
  styleUrls: ['./roomlist.component.scss']
})
export class RoomlistComponent {
  displayedColumns: string[] = ['roomname'];
  nickname: string;
  rooms: any[] = [];
  isLoadingResults = true;
  database;

  constructor(private route: ActivatedRoute, private router: Router, public datepipe: DatePipe) {
    this.nickname = localStorage.getItem('nickname')!;
    const firebaseConfig = environment.firebase;
    const app = initializeApp(firebaseConfig);
    this.database = getDatabase(app);

    const roomsRef = ref(this.database, 'rooms');
    onValue(roomsRef, (snapshot) => {
      this.rooms = [];
      snapshot.forEach((childSnapshot) => {
        const room = childSnapshot.val();
        this.rooms.push(room);
      });
      this.isLoadingResults = false;
    });
  }


  enterChatRoom(roomname: string) {
    const chat = { roomname: '', nickname: '', message: '', date: '', type: '' };
    chat.roomname = roomname;
    chat.nickname = this.nickname;
    chat.date = this.datepipe.transform(new Date(), 'dd/MM/yyyy HH:mm:ss')!;
    chat.message = `${this.nickname} enter the room`;
    chat.type = 'join';

    const chatsRef = ref(this.database, 'chats/');
    const newMessageRef = push(chatsRef);
    set(newMessageRef, chat);

    const roomUsersRef = ref(this.database, 'roomusers/');
    const roomUserQueryRef = query(roomUsersRef, equalTo('roomname', roomname));

    onValue(roomUserQueryRef, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const user = childSnapshot.val();
        if (user !== undefined) {
          const userRef = ref(this.database, 'roomusers/' + childSnapshot.key);
          set(userRef, { ...user, status: 'online' });
        }
      });
    });    

    this.router.navigate(['/chatroom', roomname]);
  }

  logout(): void {
    localStorage.removeItem('nickname');
    this.router.navigate(['/dark-login']);
  }
}
