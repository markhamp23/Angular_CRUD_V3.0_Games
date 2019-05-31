import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Game } from '../models/game';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GamesService{

  private llistaApiGames: any = [];

  API_URI = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  setLlistApiGames(llistaSensera) {
    this.llistaApiGames = Object.assign({}, llistaSensera);
  }

  getLlistApiGames() {
    return this.llistaApiGames;
  }

  getGames() {
    return this.http.get(`${this.API_URI}/games`);
  }

  getApiGames(randomNumber, articleSource): Observable<any> {
    return this.http.get<any>(`https://api.unsplash.com/photos/random?page=${randomNumber}&query=${articleSource}/480x480&client_id=542a52862af1d927653c8cea3899842958fcb6a9256496b58b7ac0be3eb3220b`);
  }

  getGame(id: string) {
    return this.http.get(`${this.API_URI}/games/${id}`);
  }

  deleteGame(id: string) {
    return this.http.delete(`${this.API_URI}/games/${id}`);
  }

  saveGame(game: Game) {
    return this.http.post(`${this.API_URI}/games`, game);
  }

  updateGame(id: string | number, updatedGame: Game): Observable<Game> {
    return this.http.put(`${this.API_URI}/games/${id}`, updatedGame);
  }
}