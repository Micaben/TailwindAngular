import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Tipopersona } from '../models/tipopersona.model';
import { Tipodocumento } from '../models/tipodocumento.model';

@Injectable({
  providedIn: 'root'
})

export class TablasService {

  private API_URL = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  obtenerTipopersona() {
    return firstValueFrom(
      this.http.get<Tipopersona[]>(
        `${this.API_URL}/tipo_persona`
      )
    );
  }

  obtenerTipodocumento() {
    return firstValueFrom(
      this.http.get<Tipodocumento[]>(
        `${this.API_URL}/tipo_documento`
      )
    );
  }
}