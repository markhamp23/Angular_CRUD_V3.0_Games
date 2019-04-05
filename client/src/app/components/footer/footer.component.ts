import { Component, OnInit, Input } from '@angular/core';
import { GamesService } from '../../services/games.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  p: number = 1;
 
  @Input() games: any;

  constructor(private gameService: GamesService) { }

  ngOnInit() {
  }

  /*getGames() {
    this.gameService.getGames()
      .subscribe(
        res => {
          this.games = res;
        },
        err => console.error(err)
      );
  }*/

}
