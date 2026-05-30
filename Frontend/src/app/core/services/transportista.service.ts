import { Injectable } from '@angular/core';
import { Transportista } from '../../shared/components/transportista/transportista.model';
import { BaseCrudService } from '../../shared/components/base_crud_component/base_crud.service';

@Injectable({
  providedIn: 'root'
})
export class TransportistaService
  extends BaseCrudService<Transportista> {

  protected override endpoint =
    'http://localhost:3000/transportista';
}