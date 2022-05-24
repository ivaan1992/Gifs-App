import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {

  get searchHistory() {
    return this.gifsService.history;
  }

  constructor( private gifsService: GifsService ) { }

  searchGif( term: string ) {
    return this.gifsService.searchGifs( term );
  }
}
