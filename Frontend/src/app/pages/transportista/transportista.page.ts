import { Component, inject, OnInit } from '@angular/core';
import { CrudTableComponent } from '../../shared/components/tables/crud-table/crud-table.component';
import { TransportistaService } from '../../core/services/transportista.service';
import { Transportista } from './transportista.model'
import { TRANSPORTISTA_TABLE_COLUMNS } from './transportista_table_config';
import { BaseCrudComponent } from '../../shared/components/base/components/base_crud.component';
import { TransportistaFormModelComponent } from './transportista-form-model.component';
import { OptionsService } from '../../core/services/options.service';
import { Option } from '../../core/models/option.model';
import { environment } from '../../../enviroments/enviroment.prod';

@Component({
  selector: 'app-transportista-page',
  standalone: true,
  templateUrl: './transportista.page.html',
  imports: [
    CrudTableComponent,
    TransportistaFormModelComponent,

  ]
})
export class TransportistaPage extends BaseCrudComponent<Transportista> {

  protected override service = inject(TransportistaService);
  private optionsService = inject(OptionsService);

  empresa_transporteOptions: Option[] = [];
  tipoDocumentoOptions: Option[] = [];
  readonly tableColumns = TRANSPORTISTA_TABLE_COLUMNS;

  override ngOnInit(): void {
    super.ngOnInit();
    this.loadOptions();
  }

  loadOptions(): void {
    this.optionsService
      .getOptions(`${environment.apiUrl}/empresa_transporte`)
      .subscribe(data => {
        console.log(data);
        this.empresa_transporteOptions = data.map((item: any) => ({
          value: item.ruc,
          label: item.razon_social,
          ruc: item.ruc
        }));
      });

    this.optionsService
      .getOptions(`${environment.apiUrl}/tipo_documento`)
      .subscribe(data => {
        this.tipoDocumentoOptions = data;
      });
  }
}