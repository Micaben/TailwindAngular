import { Component, inject, OnInit } from '@angular/core';
import { CrudTableComponent } from '../../shared/components/tabla/crud-table.component';
import { AlmacenesService } from '../../core/services/almacenes.services';
import { Almacen } from '../../shared/components/almacenes/almacen.model'
import { ALMACENES_TABLE_COLUMNS } from '../../shared/components/tabla/almacenes_table_config';
import { BaseCrudComponent } from '../../shared/components/base_crud_component/base_crud.component';
import { AlmacenFormModalComponent } from '../../shared/components/almacenes/almacen-form-modal.component';
import { AutoFocusFirstDirective } from '../../shared/directives/autofocus';

@Component({
  selector: 'app-almacen-page',
  standalone: true,
  templateUrl: './almacen.page.html',
  imports: [
    CrudTableComponent,
    AlmacenFormModalComponent,
    AutoFocusFirstDirective
  ]
})
export class AlmacenPage extends BaseCrudComponent<Almacen> {

  protected override service = inject(AlmacenesService);

  readonly tableColumns = ALMACENES_TABLE_COLUMNS;
}