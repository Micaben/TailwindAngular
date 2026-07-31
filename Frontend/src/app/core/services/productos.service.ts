import { Injectable } from '@angular/core';
import { Productos } from '../../pages/productos/productos.model';
import { API } from '../config/api.config';
import { BaseCrudService } from '../../shared/components/base/services/base_crud.service';

@Injectable({
  providedIn: 'root'
})

export class ProductosService 
  extends BaseCrudService<Productos> {
  protected override endpoint = API.productos;
  private endpointproductosconsulta = API.productosconsulta;

  toggleEstado(id: number) {
    return this.http.put(
      `${this.endpoint}/toggle-estado/${id}`,
      {}
    );
  }
  

  getStock() {
    return this.http.get<any>(
      `${this.endpointproductosconsulta}/`
    );
  }
}