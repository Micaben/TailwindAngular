import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Productos } from '../../core/models/productos.model';

@Injectable({
  providedIn: 'root'
})

export class ProductosService {

  private API_URL = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  obtenerProductos() {
      return firstValueFrom(
        this.http.get<Productos[]>(
          `${this.API_URL}/productos`
        )
      );
    }

  toggleEstado(id: number) {
    return this.http.put(
      `http://localhost:3000/productos/toggle-estado/${id}`,
      {}
    );
  }

  crearProducto(data: any) {
    return this.http.post(
      'http://localhost:3000/productos',
      data
    );
  }

  actualizarProducto(id: number, data: any) {
    return this.http.put(
      `http://localhost:3000/productos/${id}`,
      data
    );
  }
}