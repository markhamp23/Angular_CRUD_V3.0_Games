import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
//import { Observable } from 'rxjs/Observable';

@Injectable()

export class AuthenticationService {

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  API_URI = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.post<any>(`${this.API_URI}/users/`, { username: username, password: password })
        .pipe(map(user => {
            // login successful if there's a jwt token in the response
            if (user && user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(User));
            }
            return user;
        }));
  }

  getUser(username,password) {
    return this.http.post(`${this.API_URI}/users/`, JSON.stringify({ email: username, password: password }), { headers: this.headers})
  }

  logout() {
      // remove user from local storage to log user out
      localStorage.removeItem('currentUser');
      console.log('hola');
  }

}