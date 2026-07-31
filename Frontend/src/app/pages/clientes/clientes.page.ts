import { Component, inject, OnInit } from '@angular/core';
import { CrudTableComponent } from '../../shared/components/tables/crud-table/crud-table.component';
import { ClientesService } from '../../core/services/clientes.services';
import { Clientes } from './clientes.model';
import { CLIENTES_TABLE_COLUMNS } from './clientes_table_config';
import { BaseCrudComponent } from '../../shared/components/base/components/base_crud.component';
import { ClientesFormModelComponent } from './clientes-form-model.component';
import { OptionsService } from '../../core/services/options.service';
import { Option } from '../../core/models/option.model';
import { forkJoin } from 'rxjs';
import { API } from '../../core/config/api.config';

@Component({
  selector: 'app-clientes-page',
  standalone: true,
  templateUrl: './clientes.page.html',
  imports: [
    CrudTableComponent,
    ClientesFormModelComponent,
  ]
})

export class ClientesPage extends BaseCrudComponent<Clientes> {
  protected override getInitialData(): Partial<Clientes> {
    return {
      vendedor: '01',
      moneda: '01',
      condicion_venta: '01',
      estado: true
    };
  }
  protected override service = inject(ClientesService);
  readonly tableColumns = CLIENTES_TABLE_COLUMNS;
  private optionsService = inject(OptionsService);
  tipoDocumentoOptions: Option[] = [];
  tipoPersonaOptions: Option[] = [];
  monedaOptions: Option[] = [];
  vendedorOptions: Option[] = [];
  condicionVentaOptions: Option[] = [];

  override ngOnInit(): void {
    super.ngOnInit();
    this.loadOptions();
  }

  loadOptions(): void {
    forkJoin({
      documentos: this.optionsService.getOptions(API.tipoDocumento),
      personas: this.optionsService.getOptions(API.tipoPersona),
      monedas: this.optionsService.getOptions(API.moneda),
      condicion: this.optionsService.getOptions(API.condicion),
      vendedores: this.optionsService.getOptions(API.vendedor, 'codigo', 'nombres')
    }).subscribe({
      next: ({ documentos, personas, monedas, condicion, vendedores }) => {
        this.tipoDocumentoOptions = documentos;
        this.tipoPersonaOptions = personas;
        this.monedaOptions = monedas;
        this.condicionVentaOptions = condicion;
        this.vendedorOptions = vendedores;
      },
      error: err => console.error(err)
    });
  }
}