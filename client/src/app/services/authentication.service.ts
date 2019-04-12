import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  API_URI = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getUser(username,password) {
    return this.http.post(`${this.API_URI}/usersy`, JSON.stringify({ email: username, password: password }), { headers: this.headers})
  }

  getUsers() {
    return this.http.get(`${this.API_URI}/users/`);
  }

  deleteUser(username: string) {
    return this.http.delete(`${this.API_URI}/users/${username}`);
  }

  saveUser(user: User) {
    return this.http.post(`${this.API_URI}/users`, user);
  }

  updateUser(username: string, updatedUser: User): Observable<User> {
    return this.http.put(`${this.API_URI}/users/${username}`, updatedUser);
  }
}