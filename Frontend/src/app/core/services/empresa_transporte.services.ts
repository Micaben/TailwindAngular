import { Injectable } from '@angular/core';
import { Empresa_transporte } from '../../shared/components/empresa_transporte/empresa_transporte.model';
import { BaseCrudService } from '../../shared/components/base_crud_component/base_crud.service';

@Injectable({
  providedIn: 'root'
})
export class EmpresatransporteService
  extends BaseCrudService<Empresa_transporte> {

  protected override endpoint =
    'http://localhost:3000/empresa_transporte';
}