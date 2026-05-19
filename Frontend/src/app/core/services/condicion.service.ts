import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Condicion } from '../models/condicion.model';

@Injectable({
  providedIn: 'root'
})

export class CondicionService {

  private API_URL = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  obtenerCondicion() {
    return firstValueFrom(
      this.http.get<Condicion[]>(
        `${this.API_URL}/condicion`
      )
    );
  }

  crearCondicion(data: any) {
    return this.http.post(
      'http://localhost:3000/condicion',
      data
    );
  }

  actualizarCondicion(id: number, data: any) {
    return this.http.put(
      `http://localhost:3000/condicion/${id}`,
      data
    );
  }
}