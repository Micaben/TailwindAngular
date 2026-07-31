import { Component, inject, OnInit } from '@angular/core';
import { CrudTableComponent } from '../../shared/components/tables/crud-table/crud-table.component';
import { ColorService } from './color.service';
import { Modelobase } from '../../core/models/modelobase.model';
import { COLOR_TABLE_COLUMNS } from './color_table_config';
import { BaseCrudComponent } from '../../shared/components/base/components/base_crud.component';
import { ColorFormModelComponent } from './color-form-model.component';

@Component({
  selector: 'app-color-page',
  standalone: true,
  templateUrl: './color.page.html',
  imports: [
    CrudTableComponent,
    ColorFormModelComponent,

  ]
})
export class ColorPage extends BaseCrudComponent<Modelobase> {

  protected override service = inject(ColorService);

  readonly tableColumns = COLOR_TABLE_COLUMNS;
}