import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
//import * as crypto from 'crypto-js';

@Injectable()

export class AuthenticationService {

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  API_URI = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getUser(id: number) {
    this.login(id)
    return this.http.post<any>(`${this.API_URI}/users/`, JSON.stringify({ id: id }), { headers: this.headers})
  }

  login(id: number) {
    return this.http.post<any>(`${this.API_URI}/users/`, { id: id })
        .pipe(map(user => {
            // login successful if there's a jwt token in the response
            if (user && user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
            }
            return user;
        }));
  }
}