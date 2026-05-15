import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Color } from '../../core/models/color.model';


@Injectable({
  providedIn: 'root'
})

export class ColorService {

  private API_URL = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  obtenerColor() {
    return firstValueFrom(
      this.http.get<Color[]>(
        `${this.API_URL}/color`
      )
    );
  }

  crearColor(data: any) {
    return this.http.post(
      'http://localhost:3000/color',
      data
    );
  }

  actualizarColor(id: number, data: any) {
    return this.http.put(
      `http://localhost:3000/color/${id}`,
      data
    );
  }
}