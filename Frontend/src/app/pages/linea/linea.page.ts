import { Component, inject, OnInit } from '@angular/core';
import { CrudTableComponent } from '../../shared/components/tables/crud-table/crud-table.component';
import { LineaService } from '../../core/services/linea.service';
import { Modelobase } from '../../core/models/modelobase.model';
import { LINEA_TABLE_COLUMNS } from './linea_table_config';
import { BaseCrudComponent } from '../../shared/components/base/components/base_crud.component';
import { LineaFormModelComponent } from './linea-form-model.component';

@Component({
  selector: 'app-linea-page',
  standalone: true,
  templateUrl: './linea.page.html',
  imports: [
    CrudTableComponent,
    LineaFormModelComponent,

  ]
})
export class LineaPage extends BaseCrudComponent<Modelobase> {

  protected override service = inject(LineaService);

  readonly tableColumns = LINEA_TABLE_COLUMNS;
}