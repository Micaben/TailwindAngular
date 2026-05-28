import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiResponse } from '../base_crud_component/api-response';

export abstract class BaseCrudService<T> {
  protected readonly http = inject(HttpClient);
  protected abstract endpoint: string;

  // GET ALL
  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.endpoint);
  }

  // CREATE
  create(data: Partial<T>): Observable<T> {
  return this.http.post<ApiResponse<T>>(this.endpoint, data)
    .pipe(map(res => res.data));
}

  // UPDATE
  update(id: number, data: Partial<T>): Observable<T> {
    return this.http.put<ApiResponse<T>>(
      `${this.endpoint}/${id}`,
      data
    ).pipe(
      map(res => res.data)
    );
  }

  // DELETE
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.endpoint}/${id}`);
  }
}