import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Almacenes } from '../models/almacenes.model';


@Injectable({
  providedIn: 'root'
})

export class AlmacenesService {

  private API_URL = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  obtenerAlmacenes() {
    return firstValueFrom(
      this.http.get<Almacenes[]>(
        `${this.API_URL}/almacenes`
      )
    );
  }

  crearAlmacenes(data: any) {
    return this.http.post(
      'http://localhost:3000/almacenes',
      data
    );
  }

  actualizarAlmacenes(id: number, data: any) {
    return this.http.put(
      `http://localhost:3000/almacenes/${id}`,
      data
    );
  }
}