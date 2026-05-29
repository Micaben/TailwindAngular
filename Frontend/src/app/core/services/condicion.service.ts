import { Injectable } from '@angular/core';
import { Condicion } from '../../shared/components/condicion/condicion.model';
import { BaseCrudService } from '../../shared/components/base_crud_component/base_crud.service';

@Injectable({
  providedIn: 'root'
})
export class CondicionService
  extends BaseCrudService<Condicion> {

  protected override endpoint =
    'http://localhost:3000/condicion';
}