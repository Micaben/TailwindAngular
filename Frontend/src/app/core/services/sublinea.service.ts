import { Injectable } from '@angular/core';
import { Sublinea } from '../../shared/components/sublinea/sublinea.model';
import { BaseCrudService } from '../../shared/components/base_crud_component/base_crud.service';

@Injectable({
  providedIn: 'root'
})
export class SublineaService
  extends BaseCrudService<Sublinea> {

  protected override endpoint =
    'http://localhost:3000/sublinea';
}