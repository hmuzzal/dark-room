import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { Chat } from 'src/interface/chat';
import { Database, getDatabase, ref, set, onValue } from "firebase/database";
import { environment } from 'src/environments/environment.development';
import { v4 as uuid_v4 } from "uuid";


@Component({
  selector: 'app-dark-room',
  templateUrl: './dark-room.component.html',
  styleUrls: ['./dark-room.component.scss']
})
export class DarkRoomComponent {

  title = 'firechat';
  app!: FirebaseApp;
  db!: Database;
  form!: FormGroup;
  username = '';
  message = '';
  chats: Chat[] = [];
  FormData: FormGroup;
  
  ngOnInit(): void {
    const chatsRef = ref(this.db, 'chats');
    onValue(chatsRef, (snapshot: any) => {
      const data = snapshot.val();
      for (let id in data) {
        if (!this.chats.map(chat => chat.id).includes(id)) {
          this.chats.push(data[id])
        }
      }
    });
  }

  constructor(private formBuilder: FormBuilder){
    this.app = initializeApp(environment.firebase);
    this.db = getDatabase(this.app);
    this.form = this.formBuilder.group({
      'message': [],
      'username': []
    });

    this.FormData = this.formBuilder.group({
      EmailAddress: new FormControl('', [Validators.required, Validators.email]),
      Body: new FormControl('', [Validators.required])
    })
  }  

  onChatSubmit(form: any) {
    const chat = form;
    chat.timestamp = new Date().toString();
    chat.id = uuid_v4();
    set(ref(this.db, `chats/${chat.id}`), chat);
    this.form = this.formBuilder.group({
      'message': [],
      'username': [chat.username],
    });
  }
}
