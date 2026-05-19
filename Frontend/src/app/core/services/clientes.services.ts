import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Clientes } from '../models/clientes.model';

@Injectable({
  providedIn: 'root'
})

export class ClientesService {

  private API_URL = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  obtenerClientes() {
      return firstValueFrom(
        this.http.get<Clientes[]>(
          `${this.API_URL}/clientes`
        )
      );
    }

  crearClientes(data: any) {
    return this.http.post(
      'http://localhost:3000/clientes',
      data
    );
  }

  actualizarClientes(id: number, data: any) {
    return this.http.put(
      `http://localhost:3000/clientes/${id}`,
      data
    );
  }

  toggleEstado(id: number) {
    return this.http.put(
      `http://localhost:3000/clientes/toggle-estado/${id}`,
      {}
    );
  }
}