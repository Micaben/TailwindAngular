import { Injectable } from '@angular/core';
import { Transportista } from '../../pages/transportista/transportista.model';
import { BaseCrudService } from '../../shared/components/base/services/base_crud.service';
import { API } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class TransportistaService
  extends BaseCrudService<Transportista> {

  protected override endpoint = API.transportista;
}