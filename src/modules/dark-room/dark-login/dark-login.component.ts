import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { Chat } from 'src/interface/chat';
import { Database, getDatabase, ref, set, onValue, query, orderByChild, equalTo, DataSnapshot, push, get } from "firebase/database";
import { environment } from 'src/environments/environment.development';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-dark-login',
  templateUrl: './dark-login.component.html',
  styleUrls: ['./dark-login.component.scss']
})

export class DarkLoginComponent {
  loginForm!: FormGroup;
  nickname = '';
  
  // ref = firebase.database().ref('users/');

  matcher = new MyErrorStateMatcher();
  app: any;
  db: any;



  constructor(private router: Router, private formBuilder: FormBuilder) { 
    this.app = initializeApp(environment.firebase);
    this.db = getDatabase(this.app);
    ref(this.db, 'users');
  }


  ngOnInit() {
    if (localStorage.getItem('nickname')) {
      this.router.navigate(['/roomlist']);
    }
    this.loginForm = this.formBuilder.group({
      'nickname' : [null, Validators.required]
    });
  }

  onFormSubmit(form: any) {
    const loginData = form; // Renamed 'login' to 'loginData'
    const usersRef = ref(this.db, 'users');
    const queryRef = query(usersRef, orderByChild('nickname'), equalTo(loginData.nickname));
    
    get(queryRef).then((snapshot: DataSnapshot) => {
      if (snapshot.exists()) {
        localStorage.setItem('nickname', loginData.nickname);
        this.router.navigate(['/roomlist']);
      } else {
        const newUserRef = push(usersRef);
        set(newUserRef, loginData)
          .then(() => {
            localStorage.setItem('nickname', loginData.nickname);
            this.router.navigate(['/roomlist']);
          })
          .catch(error => {
            console.error('Error adding new user: ', error);
          });
      }
    }).catch(error => {
      console.error('Error querying database: ', error);
    });
  }
}
