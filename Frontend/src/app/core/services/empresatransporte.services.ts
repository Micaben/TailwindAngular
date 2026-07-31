import { Injectable } from '@angular/core';
import { Empresatransporte } from '../../pages/empresatransporte/empresatransporte.model';
import { BaseCrudService } from '../../shared/components/base/services/base_crud.service';
import { API } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class EmpresatransporteService
  extends BaseCrudService<Empresatransporte> {

  protected override endpoint = API.empresatransporte;
}