import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Empresa_transporte } from '../models/empresa_transporte.model';

@Injectable({
  providedIn: 'root'
})

export class Empresa_transporteService {

  private API_URL = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  obtenerEmpresa_transporte() {
    return firstValueFrom(
      this.http.get<Empresa_transporte[]>(
        `${this.API_URL}/empresa_transporte`
      )
    );
  }

  crearEmpresa_transporte(data: any) {
    return this.http.post(
      'http://localhost:3000/empresa_transporte',
      data
    );
  }

  actualizarEmpresa_transporte(id: number, data: any) {
    return this.http.put(
      `http://localhost:3000/empresa_transporte/${id}`,
      data
    );
  }
}