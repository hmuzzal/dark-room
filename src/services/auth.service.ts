import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  apiResponse: any;

  constructor(private jwtHelper: JwtHelperService, private http: HttpClient) { }

  ngOnInit(): void {

  }

  isUserAuthenticated = (): boolean => {
    const token = localStorage.getItem("jwt");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    return true;
    // return false;
  }

  logOut = () => {
    localStorage.removeItem("jwt");
  }

}
