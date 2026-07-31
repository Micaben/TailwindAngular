import { Component, inject, OnInit } from '@angular/core';
import { CrudTableComponent } from '../../shared/components/tables/crud-table/crud-table.component';
import { EmpresaTransporteService } from '../../core/services/condicionventa.service';
import { Condicionventa } from './condicionventa.model'
import { CONDICIONVENTA_TABLE_COLUMNS } from './condicionventa_table_config';
import { BaseCrudComponent } from '../../shared/components/base/components/base_crud.component';
import { CondicionventaFormModelComponent } from './condicionventa-form-model.component';

@Component({
  selector: 'app-condicionventa-page',
  standalone: true,
  templateUrl: './condicionventa.page.html',
  imports: [
    CrudTableComponent,
    CondicionventaFormModelComponent,

  ]
})
export class CondicionventaPage extends BaseCrudComponent<Condicionventa> {

  protected override service = inject(EmpresaTransporteService);

  readonly tableColumns = CONDICIONVENTA_TABLE_COLUMNS;
}