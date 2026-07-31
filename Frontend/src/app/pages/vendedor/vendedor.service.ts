import { Injectable } from '@angular/core';
import { Vendedor } from './vendedor.model';
import { BaseCrudService } from '../../shared/components/base/services/base_crud.service';
import { API } from '../../core/config/api.config';

@Injectable({
  providedIn: 'root'
})
export class VendedorService
  extends BaseCrudService<Vendedor> {

 protected override endpoint = API.vendedor;
}