import { Injectable } from '@angular/core';
import { Clientes } from '../../pages/clientes/clientes.model';
import { BaseCrudService } from '../../shared/components/base/services/base_crud.service';
import { API } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})

export class ClientesService
  extends BaseCrudService<Clientes> {
  protected override endpoint = API.clientes;

  toggleEstado(id: number) {
    return this.http.put(
      `${this.endpoint}/toggle-estado/${id}`,
      {}
    );
  }
}