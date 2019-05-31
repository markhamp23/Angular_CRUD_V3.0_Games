import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Game } from 'src/app/models/Game';
import { GamesService } from 'src/app/services/games.service';
import { AuthenticationService } from '../../services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LlistatModel } from '../../models/llistat-model';

@Component({
  selector: 'app-games-api',
  templateUrl: './games-api.component.html',
  styleUrls: ['./games-api.component.css']
})
export class GamesApiComponent implements OnInit {

  p: number = 1;
  games: any = [];
  llistaAux: any = [];
  variable: string = '';

  game: Game = {
    id: 0,
    title: '',
    description: '',
    image1: '',
    caption1: '',
    image2: '',
    caption2: '',
    image3: '',
    caption3: '',
    created_at: new Date()
  };

  edit: boolean = false;

  gameAux: any = null;

  @Input() articleSource: string = '';
  @Output() valueChange = new EventEmitter<any>();

  public arrayllista: any[] = [];

  constructor(private gameService: GamesService, private authenticationService: AuthenticationService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    let randomPic = Math.floor(Math.random() * 5);

    switch (randomPic)
    {
        case 1:
            this.articleSource = 'field';;
            break;
        case 2:
            this.articleSource = 'night';
            break;
        case 3:
            this.articleSource = 'cafe';
            break;   
        case 4:
            this.articleSource = 'market';
            break;    
        case 5:
            this.articleSource = 'cars';
            break;                              
        default:
            this.articleSource = 'sea';
            break;
    }

    for (let i = 0; i < 9; i++) {
      let randomNumber = Math.floor(Math.random() * 1000);
      this.gameService.getApiGames(randomNumber, this.articleSource).subscribe(resp => {
        let llistat = new LlistatModel();
        llistat.id = resp.id;
        llistat.description = resp.description;
        llistat.city = resp.location.city;
        llistat.country = resp.location.country;
        llistat.imageown = resp.user.name;
        llistat.imageurl = resp.urls.full;
        this.arrayllista.push(llistat)
      })
    }
    this.getGames();
    const params = this.activatedRoute.snapshot.params;
    if (params.id) {
      this.gameService.getGame(params.id)
        .subscribe(
          res => {
            this.game = res;
            this.edit = true
          },
          err => console.log(err)
        )
    }
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

  saveNewGame() {
    delete this.game.created_at;
    delete this.game.id;
    this.gameService.saveGame(this.game)
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/games']);
        },
        err => console.error(err)
      )
  }

  updateGame() {
    delete this.game.created_at;
    this.gameService.updateGame(this.game.id, this.game)
      .subscribe(
        res => { 
          console.log(res);
          this.router.navigate(['/games']);
        },
        err => console.error(err)
      )
  }

  onClick() {
    this.arrayllista = [];
    this.articleSource = this.variable;
    for (let i = 0; i < 9; i++) {
      let randomNumber = Math.floor(Math.random() * 1000);
      this.gameService.getApiGames(randomNumber, this.articleSource).subscribe(resp => {
        let llistat = new LlistatModel();
        llistat.id = resp.id;
        llistat.description = resp.description;
        llistat.city = resp.location.city;
        llistat.country = resp.location.country;
        llistat.imageown = resp.user.name;
        llistat.imageurl = resp.urls.full;
        this.arrayllista.push(llistat)
      })
    }
    console.log(this.arrayllista);
    this.gameService.setLlistApiGames(this.arrayllista);
    this.valueChange.emit(this.arrayllista);
  }

  getLlistaAux() {
    for (let i = 0; i <= 8; i++) {
      var newItem = this.games[Math.floor(Math.random() * this.games.length)];
      this.llistaAux.indexOf(newItem) === -1 ? this.llistaAux.push(newItem) : console.log("This item already exists");
    }
  }

  ver(game) {
    this.gameAux = game;
  }

}
