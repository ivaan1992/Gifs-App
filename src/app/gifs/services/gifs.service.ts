import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GIFResponse, Gifs } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})

export class GifsService {

  private apiKey: string = 'uFPCaNvtjyJLYof4ZANZXJr4sGKA9a84'
  private _history: string[] = [];

  public results: Gifs[] = [];

  get history() {
    
    return [...this._history];
  }

  constructor( private http:HttpClient ) { }

  searchGifs( query: string ) {

    query = query.trim().toLocaleLowerCase();
    
    if( !this._history.includes( query ) ) {
      this._history.unshift( query );
      this._history = this._history.splice(0,10);
    }

    this.http.get<GIFResponse>(`https://api.giphy.com/v1/gifs/search?api_key=uFPCaNvtjyJLYof4ZANZXJr4sGKA9a84&q=${ query }&limit=10`)
    .subscribe( (resp )  => {
      console.log( resp.data );
      this.results = resp.data
      resp.data[0]
    })
  }
}
