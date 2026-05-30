import { Injectable } from '@angular/core';
import { Tipocambio } from '../../shared/components/tipocambio/tipocambio.model';
import { BaseCrudService } from '../../shared/components/base_crud_component/base_crud.service';

@Injectable({
  providedIn: 'root'
})
export class TipocambioService
  extends BaseCrudService<Tipocambio> {

  protected override endpoint =
    'http://localhost:3000/tipocambio';
}