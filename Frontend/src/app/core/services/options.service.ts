import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Option } from '../models/option.model';

@Injectable({ providedIn: 'root' })
export class OptionsService {

  private http = inject(HttpClient);

  // =========================
  // GENERIC OPTIONS
  // =========================

  getOptions(
    endpoint: string,
    valueField: string = 'codigo',
    labelField: string = 'descripcion'

  ): Observable<Option[]> {

    return this.http
      .get<any[]>(endpoint)
      .pipe(
        map(data =>
          data.map(item => ({
            value: item[valueField],
            label: item[labelField],
            ...item
          }))
        )
      );
  }
}