import { Injectable } from '@angular/core';
import { Conceptoventa } from '../../pages/conceptoventa/conceptoventa.model';
import { BaseCrudService } from '../../shared/components/base/services/base_crud.service';
import { API } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class ConceptoventaService
  extends BaseCrudService<Conceptoventa> {

  protected override endpoint = API.concepto;
}