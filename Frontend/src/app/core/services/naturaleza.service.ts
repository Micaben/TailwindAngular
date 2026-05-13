import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Naturaleza } from '../../core/models/naturaleza.model';


@Injectable({
  providedIn: 'root'
})

export class NaturalezaService {

  private API_URL = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  obtenerNaturaleza() {
    return firstValueFrom(
      this.http.get<Naturaleza[]>(
        `${this.API_URL}/naturaleza`
      )
    );
  }

  crearNaturaleza(data: any) {
    return this.http.post(
      'http://localhost:3000/naturaleza',
      data
    );
  }

  actualizarNaturaleza(id: number, data: any) {
    return this.http.put(
      `http://localhost:3000/naturaleza/${id}`,
      data
    );
  }
}