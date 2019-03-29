import {Component, Input, Output, OnInit, EventEmitter} from '@angular/core';
import {Pagina} from '../../interfaces/pagina-interface'; 

@Component({
  selector: 'app-paginacio',
  templateUrl: './paginacio.component.html'
})
export class PaginacioComponent implements OnInit {

  @Input() 
  public pagina: Pagina<Object>;
  @Input() 
  public pageSize: number;
  @Input() 
  public currentPage: number;

  @Output() 
  pageChanged = new EventEmitter(); 

  constructor() {
  }

  ngOnInit() {

  }

  emitPageChanged(event: any): void {
    this.pageChanged.emit(event);
  }

}
