import { Injectable } from '@angular/core';
import { Serie } from '../models/serie.model';
import { BaseCrudService } from '../../shared/components/base_crud_component/base_crud.service';

@Injectable({
  providedIn: 'root'
})
export class SeriesService
  extends BaseCrudService<Serie> {

  protected override endpoint =
    'http://localhost:3000/series';

}