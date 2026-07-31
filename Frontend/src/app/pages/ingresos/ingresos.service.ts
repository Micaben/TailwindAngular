import { Injectable } from '@angular/core';
import { API } from '../../../app/core/config/api.config';
import { Ingresos } from '../../pages/ingresos/ingresos.model';
import { BaseCrudService } from '../../shared/components/base/services/base_crud.service';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})

export class IngresosService extends BaseCrudService<Ingresos> {

  protected override endpoint = API.ingresos;
  private endpointSerie  = API.ingresosSerie;
  private endpointAbrir = API.ingresos;

  getByPeriodo(
    mes?: string,
    anio?: string,
    texto?: string
  ): Observable<Ingresos[]> {

    return this.http.get<Ingresos[]>(
      this.endpoint,
      {
        params: {
          mes: mes ?? '',
          anio: anio ?? '',
          texto: texto ?? ''
        }
      }
    );
  }

  getDocumento(id: number) {
    return this.http.get<any>(
      `${this.endpointAbrir}/${id}`
    );
  }


}