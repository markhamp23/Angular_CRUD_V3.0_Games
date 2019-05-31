import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpResponse } from '@angular/common/http';
import { BaseService } from './base.service'
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { map, catchError } from 'rxjs/operators';
import Utils  from '../utils/utils';

@Injectable()

export class AuthenticationService extends BaseService {

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  public usuariActual: User;

  API_URI = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {  
    super();
    if (Utils.getCookie("Authorization")) {
      this.usuariActual = this.getUsuariActualSync();
    }    
  }

  isLoggedIn() {
    if (Utils.getCookie('Authorization') && this.usuariActual) {
        return true;
    }
    else return false;
  }

  login(id: number): Observable<Boolean> {
    return this.http.post<any>(`${this.API_URI}/users/`, JSON.stringify({ id: id }), { headers: this.headers, observe: "response" }).pipe(
        map((response: HttpResponse<Boolean>) => {
            let token = response.headers.get('authorization');
            if (token) {
              Utils.setCookie("Authorization", token, 2);
              this.getUsuariActualIntern()
                  .subscribe(result => {
                     //this.usuariActual = new User(result);
                  });
              // return true to indicate successful login
              return true;
            } else {
                // return false to indicate failed login
              return false;
            }
        }), catchError(this.handleError));
  }

  logout(): void {
    Utils.deleteCookie('Authorization');
    this.usuariActual = null;
  }

  getUsuariActual() {
    return this.usuariActual;
  }

  getUsuariActualIntern(): Observable<User> {
    return this.http.get<User>('/api/users/').pipe(
        catchError(this.handleError));
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
}