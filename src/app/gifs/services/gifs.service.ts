import { Injectable, Query } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { SearchGifsResponse, Gif } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private apiKey: string = 'B3gI67y5Y8n4paPJIpZQ04g2HdwcG5zm';

  private _historial: string[] = [];

  get historial() {
    return [...this._historial];
  }

  //TODO: cambiar any por su tipo correspondiente
  public resultados: Gif[] = [];

  constructor(private http: HttpClient) {
    /* if (localStorage.getItem('gifsHistorial')) {
      this._historial = JSON.parse(localStorage.getItem('gifsHistorial')!);
    } */
    /* OTRA FORMA MAS CORTA*/
    this._historial = JSON.parse(localStorage.getItem('gifsHistorial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('gifsResultados')!) || [];
  }

  /* async */ buscarGifts(query: string = '') {
    query = query.trim().toLowerCase();

    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);

      localStorage.setItem('gifsHistorial', JSON.stringify(this._historial));
    }
    /* CON FETCH JS */
    // fetch(
    //   'https://api.giphy.com/v1/gifs/search?api_key=B3gI67y5Y8n4paPJIpZQ04g2HdwcG5zm&q=dragon ball z&limit=10'
    // ).then((resp) => {
    //   resp.json().then((data) => {
    //     console.log(data);
    //   });
    // });

    /* CON ASYNC AWAIT */
    // const resp = await fetch(
    //   'https://api.giphy.com/v1/gifs/search?api_key=B3gI67y5Y8n4paPJIpZQ04g2HdwcG5zm&q=dragon ball z&limit=10'
    // );

    // const data = await resp.json();
    // console.log(data);

    /* CON HTTP CLIENT -> FROM @angular/common/http */

    this.http
      .get<SearchGifsResponse>(
        `https://api.giphy.com/v1/gifs/search?api_key=B3gI67y5Y8n4paPJIpZQ04g2HdwcG5zm&q=${query}&limit=12`
      )
      .subscribe((resp) => {
        console.log(resp.data);
        this.resultados = resp.data;
        localStorage.setItem('gifsResultados', JSON.stringify(this.resultados));
      });
  }
}
