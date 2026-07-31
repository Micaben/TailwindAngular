import { Component, inject, OnInit } from '@angular/core';
import { CrudTableComponent } from '../../shared/components/tables/crud-table/crud-table.component';
import { SeriesService } from '../../core/services/series.service';
import { Series } from './series.model'
import { SERIES_TABLE_COLUMNS } from './series_table_config';
import { BaseCrudComponent } from '../../shared/components/base/components/base_crud.component';
import { SeriesFormModelComponent } from './series-form-model.component';
import { OptionsService } from '../../core/services/options.service';
import { Option } from '../../core/models/option.model';

@Component({
  selector: 'app-series-page',
  standalone: true,
  templateUrl: './series.page.html',
  imports: [
    CrudTableComponent,
    SeriesFormModelComponent,

  ]
})
export class SeriesPage extends BaseCrudComponent<Series> {

   protected override service = inject(SeriesService);

  private optionsService = inject(OptionsService);

  comprobanteOptions: Option[] = [];

  readonly tableColumns = SERIES_TABLE_COLUMNS;

  override ngOnInit(): void {
    super.ngOnInit();
    this.loadOptions();
  }

  loadOptions(): void {
    this.optionsService
      .getOptions('http://localhost:3000/documentos')
      .subscribe(data => {
        this.comprobanteOptions = data;
      });
  }
}