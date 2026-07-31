import { Injectable } from '@angular/core';
import { Modelobase } from '../../core/models/modelobase.model';
import { BaseCrudService } from '../../shared/components/base/services/base_crud.service';
import { API } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class LineaService
  extends BaseCrudService<Modelobase> {

  protected override endpoint = API.linea;
}