import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Concepto } from '../models/concepto.model';

@Injectable({
  providedIn: 'root'
})

export class ConceptoService {

  private API_URL = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  obtenerConcepto() {
    return firstValueFrom(
      this.http.get<Concepto[]>(
        `${this.API_URL}/concepto`
      )
    );
  }

  crearConcepto(data: any) {
    return this.http.post(
      'http://localhost:3000/concepto',
      data
    );
  }

  actualizarConcepto(id: number, data: any) {
    return this.http.put(
      `http://localhost:3000/concepto/${id}`,
      data
    );
  }
}