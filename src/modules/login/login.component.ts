// import { Component } from '@angular/core';

// @Component({
//   selector: 'login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.scss']
// })
// export class LoginComponent {

//   ngOnInit(): void {
//     }
    
// }



import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { LoginVm } from 'src/models/LoginVm';
import { LoginResponse } from 'src/models/loginResoponse';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent implements OnInit {
  invalidLogin: boolean = false;
  credentials: LoginVm = { username: '', password: '' };

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {

  }

  login = (form: NgForm) => {
    if (form.valid) {
      this.http.post<LoginResponse>("https://localhost:7253/api/auth/login", this.credentials, {
        headers: new HttpHeaders({ "Content-Type": "application/json" })
      })
        .subscribe({
          next: (response: LoginResponse) => {
            const token = response.token;
            localStorage.setItem("jwt", token);
            this.invalidLogin = false;
            this.router.navigate(["/"]);
          },
          error: (err: HttpErrorResponse) => this.invalidLogin = true
        })
    }
  }
}