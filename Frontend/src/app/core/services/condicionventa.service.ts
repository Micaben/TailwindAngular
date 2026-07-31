import { Injectable } from '@angular/core';
import { Condicionventa } from '../../pages/condicionventa/condicionventa.model';
import { BaseCrudService } from '../../shared/components/base/services/base_crud.service';
import { API } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class EmpresaTransporteService
  extends BaseCrudService<Condicionventa> {

  protected override endpoint = API.condicion;
}