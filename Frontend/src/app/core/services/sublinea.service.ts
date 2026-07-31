import { Injectable } from '@angular/core';
import { Sublinea } from '../../pages/sublinea/sublinea.model';
import { BaseCrudService } from '../../shared/components/base/services/base_crud.service';
import { API } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class SublineaService
  extends BaseCrudService<Sublinea> {

  protected override endpoint = API.sublinea;
}