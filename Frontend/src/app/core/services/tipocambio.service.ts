import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Tipocambio } from '../../core/models/tipocambio.model';


@Injectable({
  providedIn: 'root'
})

export class TipocambioService {

  private API_URL = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  obtenerTipocambio() {
    return firstValueFrom(
      this.http.get<Tipocambio[]>(
        `${this.API_URL}/tipocambio`
      )
    );
  }

  crearTipocambio(data: any) {
    return this.http.post(
      'http://localhost:3000/tipocambio',
      data
    );
  }

  actualizarTipocambio(id: number, data: any) {
    return this.http.put(
      `http://localhost:3000/tipocambio/${id}`,
      data
    );
  }
}