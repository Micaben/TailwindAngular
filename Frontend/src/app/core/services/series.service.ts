import { Injectable } from '@angular/core';
import { Series } from '../../pages/series/series.model';
import { BaseCrudService } from '../../shared/components/base/services/base_crud.service';
import { API } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class SeriesService
  extends BaseCrudService<Series> {

  protected override endpoint = API.series;

}