import { Component, inject, OnInit } from '@angular/core';
import { CrudTableComponent } from '../../shared/components/tables/crud-table/crud-table.component';
import { SublineaService } from '../../core/services/sublinea.service';
import { Sublinea } from './sublinea.model'
import { SUBLINEA_TABLE_COLUMNS } from './sublinea_table_config';
import { BaseCrudComponent } from '../../shared/components/base/components/base_crud.component';
import { SublineaFormModelComponent } from './sublinea-form-model.component';
import { OptionsService } from '../../core/services/options.service';
import { Option } from '../../core/models/option.model';

@Component({
  selector: 'app-sublinea-page',
  standalone: true,
  templateUrl: './sublinea.page.html',
  imports: [
    CrudTableComponent,
    SublineaFormModelComponent,

  ]
})
export class SublineaPage extends BaseCrudComponent<Sublinea> {

   protected override service = inject(SublineaService);

  private optionsService = inject(OptionsService);

  comprobanteOptions: Option[] = [];

  readonly tableColumns = SUBLINEA_TABLE_COLUMNS;

  override ngOnInit(): void {
    super.ngOnInit();
    this.loadOptions();
  }

  loadOptions(): void {
    this.optionsService
      .getOptions('http://localhost:3000/linea')
      .subscribe(data => {
        this.comprobanteOptions = data;
      });
  }
}