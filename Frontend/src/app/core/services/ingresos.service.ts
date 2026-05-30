import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Ingresos } from '../models/ingresos.model';
import { Serie } from '../../shared/components/series/serie.model';
import { Modelobase } from '../models/modelobase.model';

@Injectable({
  providedIn: 'root'
})

export class IngresosService {

  private API_URL = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  obtenerIngresos() {
    return firstValueFrom(
      this.http.get<Ingresos[]>(
        `${this.API_URL}/ingresos`
      )
    );
  }

  obtenerSerie() {
    return firstValueFrom(
      this.http.get<Serie[]>(
        `${this.API_URL}/series`
      )
    );
  }

  obtenerTipooperacion() {
    return firstValueFrom(
      this.http.get<Modelobase[]>(
        `${this.API_URL}/tipo_operacion`
      )
    );
  }

  crearIngresos(data: any) {
    return this.http.post(
      'http://localhost:3000/ingresos',
      data
    );
  }

  actualizarIngresos(id: number, data: any) {
    return this.http.put(
      `http://localhost:3000/ingresos/${id}`,
      data
    );
  }
}