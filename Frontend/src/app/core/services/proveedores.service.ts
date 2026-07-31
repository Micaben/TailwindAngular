import { Injectable } from '@angular/core';
import { Proveedores } from '../../pages/proveedores/proveedores.model';
import { API } from '../config/api.config';
import { BaseCrudService } from '../../shared/components/base/services/base_crud.service';

@Injectable({
  providedIn: 'root'
})

export class ProveedoresService 
  extends BaseCrudService<Proveedores> {
  protected override endpoint = API.proveedores;

  toggleEstado(id: number) {
    return this.http.put(
      `${this.endpoint}/toggle-estado/${id}`,
      {}
    );
  }
}