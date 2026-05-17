import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Proveedores } from '../models/proveedores.model';

@Injectable({
  providedIn: 'root'
})

export class ProveedoresService {

  private API_URL = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  obtenerProveedor() {
      return firstValueFrom(
        this.http.get<Proveedores[]>(
          `${this.API_URL}/proveedor`
        )
      );
    }

  crearProveedor(data: any) {
    return this.http.post(
      'http://localhost:3000/proveedor',
      data
    );
  }

  actualizarProveedor(id: number, data: any) {
    return this.http.put(
      `http://localhost:3000/proveedor/${id}`,
      data
    );
  }

  toggleEstado(id: number) {
    return this.http.put(
      `http://localhost:3000/proveedor/toggle-estado/${id}`,
      {}
    );
  }
}