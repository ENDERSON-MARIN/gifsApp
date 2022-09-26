import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private apiKey: string = 'B3gI67y5Y8n4paPJIpZQ04g2HdwcG5zm';

  private _historial: string[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor(private http: HttpClient) {}

  /* async */ buscarGifts(query: string = '') {
    query = query.trim().toLowerCase();

    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);
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
      .get(
        'https://api.giphy.com/v1/gifs/search?api_key=B3gI67y5Y8n4paPJIpZQ04g2HdwcG5zm&q=dragon ball z&limit=10'
      )
      .subscribe((resp:any) => {
        console.log(resp.data);
      });
  }
}
