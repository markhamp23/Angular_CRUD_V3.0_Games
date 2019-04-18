import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { map, catchError } from 'rxjs/operators';
import Utils from '../utils/utils'

@Injectable()

export class AuthenticationService {

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  public usuariActual: User;
  ok: number = 0;

  API_URI = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {  
    if (Utils.getCookie("Authorization")) {
      this.usuariActual = this.getUsuariActualSync();
    }    
  }

  private getUsuariActualSync(): User {
    var token = Utils.getCookie('Authorization');
    if (token) {
        token = token.replace(/\"/g, "");
        var request = new XMLHttpRequest();
        request.open('GET', '/api/users/', false);  // `false` makes the request synchronous
        request.setRequestHeader('Authorization', token);
        request.send(null);
    }
    return null;
}

  getUser(id: number) {
    this.login(id)
    return this.http.post<any>(`${this.API_URI}/users/`, JSON.stringify({ id: id }), { headers: this.headers })
  }

  isLogin() {
    return this.usuariActual != null;
  }

  login(id: number): Observable<Boolean> {
    return this.http.post<any>(`${this.API_URI}/users/`, JSON.stringify({ id: id }), { headers: this.headers, observe: "response" }).pipe(
        map((response: HttpResponse<Boolean>) => {
            let token = response.headers.get('authorization');
            if (token) {
                Utils.setCookie("Authorization", token, 2);
                this.usuariActual = new User;
                // return true to indicate successful login
                return true;
            } else {
                // return false to indicate failed login
                                Utils.setCookie("Authorization", token, 2);
                this.usuariActual = new User;
            }
        }));
  }
  
  isLoggedIn() {
    if (this.usuariActual) {
        return true;
    }
    else return false;
  }

  logout(): void {
    Utils.deleteCookie('Authorization');
    this.usuariActual = null;
}

}