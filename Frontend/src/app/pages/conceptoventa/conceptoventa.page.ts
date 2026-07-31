import { Component, inject, OnInit } from '@angular/core';
import { CrudTableComponent } from '../../shared/components/tables/crud-table/crud-table.component';
import { ConceptoventaService } from '../../core/services/conceptoventa.services';
import { Conceptoventa } from './conceptoventa.model'
import { CONCEPTOVENTA_TABLE_COLUMNS } from './conceptoventa_table_config';
import { BaseCrudComponent } from '../../shared/components/base/components/base_crud.component';
import { ConceptoventaFormModelComponent } from './conceptoventa-form-model.component';
import { OptionsService } from '../../core/services/options.service';
import { Option } from '../../core/models/option.model';

@Component({
  selector: 'app-conceptoventa-page',
  standalone: true,
  templateUrl: './conceptoventa.page.html',
  imports: [
    CrudTableComponent,
    ConceptoventaFormModelComponent,

  ]
})
export class ConceptoventaPage extends BaseCrudComponent<Conceptoventa> {

   protected override service = inject(ConceptoventaService);

  private optionsService = inject(OptionsService);

  comprobanteOptions: Option[] = [];

  readonly tableColumns = CONCEPTOVENTA_TABLE_COLUMNS;

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