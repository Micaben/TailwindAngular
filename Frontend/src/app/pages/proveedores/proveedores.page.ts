import { Component, inject, OnInit } from '@angular/core';
import { CrudTableComponent } from '../../shared/components/tables/crud-table/crud-table.component';
import { ProveedoresService } from '../../core/services/proveedores.service';
import { Proveedores } from './proveedores.model';
import { PROVEEDORES_TABLE_COLUMNS } from './proveedores_table_config';
import { BaseCrudComponent } from '../../shared/components/base/components/base_crud.component';
import { ProveedoresFormModelComponent } from './proveedores-form-model.component';
import { OptionsService } from '../../core/services/options.service';
import { Option } from '../../core/models/option.model';
import { forkJoin } from 'rxjs';
import { API } from '../../core/config/api.config';

@Component({
  selector: 'app-proveedores-page',
  standalone: true,
  templateUrl: './proveedores.page.html',
  imports: [
    CrudTableComponent,
    ProveedoresFormModelComponent,
  ]
})

export class ProveedoresPage extends BaseCrudComponent<Proveedores> {

  protected override service = inject(ProveedoresService);
  readonly tableColumns = PROVEEDORES_TABLE_COLUMNS;
  private optionsService = inject(OptionsService);
  tipoDocumentoOptions: Option[] = [];
  tipoPersonaOptions: Option[] = [];

  override ngOnInit(): void {
    super.ngOnInit();
    this.loadOptions();
  }

  loadOptions(): void {
    forkJoin({
      documentos: this.optionsService.getOptions(API.tipoDocumento),
      personas: this.optionsService.getOptions(API.tipoPersona),
    }).subscribe({
      next: ({ documentos, personas}) => {
        this.tipoDocumentoOptions = documentos;
        this.tipoPersonaOptions = personas;
      },
      error: err => console.error(err)
    });
  }
}