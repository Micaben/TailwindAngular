import { Component, inject, OnInit } from '@angular/core';
import { CrudTableComponent } from '../../shared/components/tables/crud-table/crud-table.component';
import { EmpresatransporteService } from '../../core/services/empresatransporte.services';
import { Empresatransporte } from './empresatransporte.model'
import { EMPRESATRANSPORTE_TABLE_COLUMNS } from './empresatransporte_table_config';
import { BaseCrudComponent } from '../../shared/components/base/components/base_crud.component';
import { EmpresatransporteFormModelComponent } from './empresatransporte-form-model.component';

@Component({
  selector: 'app-empresatransporte-page',
  standalone: true,
  templateUrl: './empresatransporte.page.html',
  imports: [
    CrudTableComponent,
    EmpresatransporteFormModelComponent,

  ]
})
export class EmpresatransportePage extends BaseCrudComponent<Empresatransporte> {

  protected override service = inject(EmpresatransporteService);

  readonly tableColumns = EMPRESATRANSPORTE_TABLE_COLUMNS;
}