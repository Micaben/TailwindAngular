import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { UnidadMedida } from '../../core/models/unidadmedida.model';

@Injectable({
  providedIn: 'root'
})

export class UnidadMedidaService {

  private API_URL = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  obtenerUnidadMedida() {
    return firstValueFrom(
      this.http.get<UnidadMedida[]>(
        `${this.API_URL}/unidadmedida`
      )
    );
  }

  crearUnidadMedida(data: any) {
    return this.http.post(
      'http://localhost:3000/unidadmedida',
      data
    );
  }

  actualizarUnidadMedida(id: number, data: any) {
    return this.http.put(
      `http://localhost:3000/unidadmedida/${id}`,
      data
    );
  }
}