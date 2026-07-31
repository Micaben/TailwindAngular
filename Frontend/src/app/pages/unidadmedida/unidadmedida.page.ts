import { Component, inject, OnInit } from '@angular/core';
import { CrudTableComponent } from '../../shared/components/tables/crud-table/crud-table.component';
import { UnidadmedidaService } from '../../core/services/unidadmedida.service';
import { Modelobase } from '../../core/models/modelobase.model';
import { UNIDADMEDIDA_TABLE_COLUMNS } from './unidadmedida_table_config';
import { BaseCrudComponent } from '../../shared/components/base/components/base_crud.component';
import { UnidadmedidaFormModelComponent } from './unidadmedida-form-model.component';

@Component({
  selector: 'app-unidadmedida-page',
  standalone: true,
  templateUrl: './unidadmedida.page.html',
  imports: [
    CrudTableComponent,
    UnidadmedidaFormModelComponent,

  ]
})
export class UnidadmedidaPage extends BaseCrudComponent<Modelobase> {

  protected override service = inject(UnidadmedidaService);

  readonly tableColumns = UNIDADMEDIDA_TABLE_COLUMNS;
}