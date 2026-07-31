import { Injectable } from '@angular/core';
import { Ubigeo } from '../../shared/components/ubigeo/ubigeo_model';
import { BaseCrudService } from '../../shared/components/base/services/base_crud.service';
import { API } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class UbigeoService
  extends BaseCrudService<Ubigeo> {

  protected override endpoint = API.ubigeo;
}