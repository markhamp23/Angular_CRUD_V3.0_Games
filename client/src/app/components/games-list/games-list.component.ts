import { Component, OnInit, HostBinding } from '@angular/core';
import { GamesService } from '../../services/games.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.css'],
})
export class GamesListComponent implements OnInit {

  modeUser: boolean = true;
  cookieValue = 'UNKNOWN';

  //@HostBinding('class') classes = 'row';
  mouseHover(e) {
    document.getElementById("flash").style.visibility = "hidden";
    var elems = document.getElementsByClassName('class1');
  }

  p: number = 1;
  games: any = [];
  llistaAux: any = [];

  constructor(private gameService: GamesService, private cookieService: CookieService) { }

  ngOnInit() {
    this.getGames(); 
    this.cookieValue = this.cookieService.get('loading'); 
  }

  getGames() {
    this.gameService.getGames()
      .subscribe(
        res => {
          this.games = res;
          this.getLlistaAux();
        },
        err => console.error(err)
      );
  }

  deleteGame(id: string) {
    this.gameService.deleteGame(id)
      .subscribe(
        res => {
          console.log(res);
          this.getGames();
        },
        err => console.error(err)
      )
  }

  getLlistaAux() {
    for(let i = 0; i <= 8; i++){
      var newItem = this.games[Math.floor(Math.random() * this.games.length)];
      this.llistaAux.indexOf(newItem) === -1 ? this.llistaAux.push(newItem): console.log("This item already exists");
    }
  }

}