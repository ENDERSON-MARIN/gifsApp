import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private apiKey: string = 'B3gI67y5Y8n4paPJIpZQ04g2HdwcG5zm';

  private _historial: string[] = [];

  get historial() {
    return [...this._historial];
  }

  buscarGifts(query: string = '') {
    query = query.trim().toLowerCase();

    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);
    }
    console.log(this._historial);
  }
}
