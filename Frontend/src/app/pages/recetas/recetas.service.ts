import { Injectable } from '@angular/core';
import { API } from '../../../app/core/config/api.config';
import { Recetas } from '../../pages/recetas/recetas.model';
import { BaseCrudService } from '../../shared/components/base/services/base_crud.service';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})

export class RecetasService extends BaseCrudService<Recetas> {

  protected override endpoint = API.ingresos;
  private endpointSerie  = API.ingresosSerie;
  private endpointAbrir = API.ingresos;

  getByPeriodo(
    mes?: string,
    anio?: string,
    texto?: string
  ): Observable<Recetas[]> {

    return this.http.get<Recetas[]>(
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