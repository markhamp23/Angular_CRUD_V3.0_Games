import { Injectable } from '@angular/core';
import { GamesService } from './games.service';
import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class GameResolve implements Resolve<any> {
  constructor(private gamesService: GamesService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.gamesService.getGames();
  }
}