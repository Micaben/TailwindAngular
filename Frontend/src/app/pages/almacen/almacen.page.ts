import { Component, inject, OnInit } from '@angular/core';
import { CrudTableComponent } from '../../shared/components/tables/crud-table/crud-table.component';
import { AlmacenesService } from '../../core/services/almacenes.services';
import { Almacen } from './almacen.model'
import { ALMACENES_TABLE_COLUMNS } from './almacenes_table_config';
import { BaseCrudComponent } from '../../shared/components/base/components/base_crud.component';
import { AlmacenFormModelComponent } from './almacen-form-model.component';

@Component({
  selector: 'app-almacen-page',
  standalone: true,
  templateUrl: './almacen.page.html',
  imports: [
    CrudTableComponent,
    AlmacenFormModelComponent,

  ]
})
export class AlmacenPage extends BaseCrudComponent<Almacen> {

  protected override service = inject(AlmacenesService);

  readonly tableColumns = ALMACENES_TABLE_COLUMNS;
}