import { Injectable } from '@angular/core';
import { Vendedor } from '../../shared/components/vendedor/vendedor.model';
import { BaseCrudService } from '../../shared/components/base_crud_component/base_crud.service';

@Injectable({
  providedIn: 'root'
})
export class VendedorService
  extends BaseCrudService<Vendedor> {

  protected override endpoint =
    'http://localhost:3000/vendedor';
}