import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Vendedor } from '../models/vendedor.model';

@Injectable({
  providedIn: 'root'
})

export class VendedorService {

  private API_URL = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  obtenerVendedor() {
    return firstValueFrom(
      this.http.get<Vendedor[]>(
        `${this.API_URL}/vendedor`
      )
    );
  }

  crearVendedor(data: any) {
    return this.http.post(
      'http://localhost:3000/vendedor',
      data
    );
  }

  actualizarVendedor(id: number, data: any) {
    return this.http.put(
      `http://localhost:3000/vendedor/${id}`,
      data
    );
  }
}