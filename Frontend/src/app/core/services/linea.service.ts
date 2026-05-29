import { Injectable } from '@angular/core';
import { Modelobase } from '../../core/models/modelobase.model';
import { BaseCrudService } from '../../shared/components/base_crud_component/base_crud.service';

@Injectable({
  providedIn: 'root'
})
export class LineaService
  extends BaseCrudService<Modelobase> {

  protected override endpoint =
    'http://localhost:3000/linea';
}