import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Modelobase } from '../models/modelobase.model';

@Injectable({
  providedIn: 'root'
})

export class TablasService {

  private API_URL = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  obtenerTipopersona() {
    return firstValueFrom(
      this.http.get<Modelobase[]>(
        `${this.API_URL}/tipo_persona`
      )
    );
  }

  obtenerTipodocumento() {
    return firstValueFrom(
      this.http.get<Modelobase[]>(
        `${this.API_URL}/tipo_documento`
      )
    );
  }

  obtenerMoneda() {
    return firstValueFrom(
      this.http.get<Modelobase[]>(
        `${this.API_URL}/moneda`
      )
    );
  }

  obtenerDocumentos() {
    return firstValueFrom(
      this.http.get<Modelobase[]>(
        `${this.API_URL}/documentos`
      )
    );
  }

  obtenerTipofactura() {
    return firstValueFrom(
      this.http.get<Modelobase[]>(
        `${this.API_URL}/tipo_factura`
      )
    );
  }

  obtenerTipoOperacion() {
    return firstValueFrom(
      this.http.get<Modelobase[]>(
        `${this.API_URL}/tipo_operacion`
      )
    );
  }

  obtenerTipoAfectacion() {
    return firstValueFrom(
      this.http.get<Modelobase[]>(
        `${this.API_URL}/tipo_afectacion`
      )
    );
  }

  obtenerTipoND() {
    return firstValueFrom(
      this.http.get<Modelobase[]>(
        `${this.API_URL}/tipo_nd`
      )
    );
  }

  obtenerTipoNC() {
    return firstValueFrom(
      this.http.get<Modelobase[]>(
        `${this.API_URL}/tipo_nc`
      )
    );
  }
}