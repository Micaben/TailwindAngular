import { Injectable } from '@angular/core';
import { Concepto } from '../../shared/components/concepto/concepto.model';
import { BaseCrudService } from '../../shared/components/base_crud_component/base_crud.service';

@Injectable({
  providedIn: 'root'
})
export class ConceptoService
  extends BaseCrudService<Concepto> {

  protected override endpoint =
    'http://localhost:3000/concepto';
}