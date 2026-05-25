import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Documentos } from '../models/documentos.model';
import { Serie } from '../models/serie.model';


@Injectable({
  providedIn: 'root'
})

export class DocumentosService {

  private API_URL = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  obtenerDocumentos() {
    return firstValueFrom(
      this.http.get<Documentos[]>(
        `${this.API_URL}/documentos`
      )
    );
  }

  crearDocumentos(data: any) {
    return this.http.post(
      'http://localhost:3000/documentos',
      data
    );
  }

  actualizarDocumentos(id: number, data: any) {
    return this.http.put(
      `http://localhost:3000/documentos/${id}`,
      data
    );
  }

  obtenerSerie() {
    return firstValueFrom(
      this.http.get<Serie[]>(
        `${this.API_URL}/series`
      )
    );
  }

  crearSerie(data: any) {
    return this.http.post(
      'http://localhost:3000/series',
      data
    );
  }

  actualizarSerie(id: number, data: any) {
    return this.http.put(
      `http://localhost:3000/series/${id}`,
      data
    );
  }
}