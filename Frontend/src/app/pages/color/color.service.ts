import { Injectable } from '@angular/core';
import { Modelobase } from '../../core/models/modelobase.model';
import { BaseCrudService } from '../../shared/components/base/services/base_crud.service';
import { API } from '../../core/config/api.config';

@Injectable({
  providedIn: 'root'
})
export class ColorService
  extends BaseCrudService<Modelobase> {

  protected override endpoint = API.color;
}