import { Component, OnInit, Input } from '@angular/core';
import { GamesService } from '../../services/games.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  @Input() games: any;
  @Input() llistaAux: any;

  constructor(private gameService: GamesService) { }

  ngOnInit() { 
  }
  onClick(event) {
    console.log(event);
  }
}
