import { Injectable } from '@angular/core';
import { Tipocambio } from '../../pages/tipocambio/tipocambio.model';
import { BaseCrudService } from '../../shared/components/base/services/base_crud.service';
import { Observable } from 'rxjs';
import { API } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class TipocambioService
  extends BaseCrudService<Tipocambio> {

  protected override endpoint = API.tipocambio;

  getByPeriodo(
    mes?: string,
    anio?: string
  ): Observable<Tipocambio[]> {

    return this.http.get<Tipocambio[]>(
      this.endpoint,
      {
        params: {
          mes: mes ?? '',
          anio: anio ?? ''
        }
      }
    );

  }
}