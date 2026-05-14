import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Linea } from '../../core/models/linea.model';


@Injectable({
  providedIn: 'root'
})

export class LineaService {

  private API_URL = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  obtenerLinea() {
    return firstValueFrom(
      this.http.get<Linea[]>(
        `${this.API_URL}/linea`
      )
    );
  }

  crearLinea(data: any) {
    return this.http.post(
      'http://localhost:3000/linea',
      data
    );
  }

  actualizarLinea(id: number, data: any) {
    return this.http.put(
      `http://localhost:3000/linea/${id}`,
      data
    );
  }
}