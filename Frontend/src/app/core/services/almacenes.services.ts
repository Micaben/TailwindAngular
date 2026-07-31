import { Injectable } from '@angular/core';
import { Modelobase } from '../../core/models/modelobase.model';
import { BaseCrudService } from '../../shared/components/base/services/base_crud.service';

@Injectable({
  providedIn: 'root'
})
export class AlmacenesService
  extends BaseCrudService<Modelobase> {

  protected override endpoint =
    'http://localhost:3000/almacenes';
}