import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Sublinea } from '../../core/models/sublinea.model';

@Injectable({
  providedIn: 'root'
})

export class SublineaService {

  private API_URL = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  obtenerSublinea() {
    return firstValueFrom(
      this.http.get<Sublinea[]>(
        `${this.API_URL}/sublinea`
      )
    );
  }

  crearSublinea(data: any) {
    return this.http.post(
      'http://localhost:3000/sublinea',
      data
    );
  }

  actualizarSublinea(id: number, data: any) {
    return this.http.put(
      `http://localhost:3000/sublinea/${id}`,
      data
    );
  }
}