import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { GIFResponse, Gifs } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})

export class GifsService {

  private apiKey: string = 'uFPCaNvtjyJLYof4ZANZXJr4sGKA9a84';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs'
  private _history: string[] = [];

  public results: Gifs[] = [];


  get history() {

    return [...this._history];
  }

  constructor( private http:HttpClient ) {
    // forma 1
    this._history = JSON.parse(localStorage.getItem('history')!) || [];

  // Tarea

  this.results = JSON.parse(localStorage.getItem('results')! ) || [];

  //  if (localStorage.getItem('results') ) {
  //    this._history = JSON.parse ( localStorage.getItem('results')! );

    //forma 2

    /* if (localStorage.getItem('history') ) {
      this._history = JSON.parse ( localStorage.getItem('history')! );
    } */
   }

  searchGifs( query: string ) {

    query = query.trim().toLocaleLowerCase();

    if( !this._history.includes( query ) ) {
      this._history.unshift( query );
      this._history = this._history.splice(0,20);
      localStorage.setItem('history', JSON.stringify( this._history ) );
    }

    const params = new HttpParams()
    .set('api_key', this.apiKey)
    .set('limit', '20')
    .set('q', query);

    this.http.get<GIFResponse>(`${ this.serviceUrl }/search`, { params: params })
    .subscribe( (resp )  => {
      this.results = resp.data;
      localStorage.setItem('results', JSON.stringify(this.results) );
    })
  }
}
