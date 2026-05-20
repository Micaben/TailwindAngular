import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Transportista } from '../models/transportista.model';

@Injectable({
  providedIn: 'root'
})

export class TransportistaService {

  private API_URL = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  obtenerTransportista() {
    return firstValueFrom(
      this.http.get<Transportista[]>(
        `${this.API_URL}/transportista`
      )
    );
  }

  crearTransportista(data: any) {
    return this.http.post(
      'http://localhost:3000/transportista',
      data
    );
  }

  actualizarTransportista(id: number, data: any) {
    return this.http.put(
      `http://localhost:3000/transportista/${id}`,
      data
    );
  }
}