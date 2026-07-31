import { Component, inject, OnInit } from '@angular/core';
import { CrudTableComponent } from '../../shared/components/tables/crud-table/crud-table.component';
import { VendedorService } from './vendedor.service';
import { Vendedor } from './vendedor.model'
import { VENDEDOR_TABLE_COLUMNS } from './vendedor_table_config';
import { BaseCrudComponent } from '../../shared/components/base/components/base_crud.component';
import { VendedorFormModelComponent } from './vendedor-form-model.component';

@Component({
  selector: 'app-vendedor-page',
  standalone: true,
  templateUrl: './vendedor.page.html',
  imports: [
    CrudTableComponent,
    VendedorFormModelComponent,

  ]
})
export class VendedorPage extends BaseCrudComponent<Vendedor> {
  protected override getInitialData(): Partial<Vendedor> {
    return {
      estado: true
    };
  }
  
  protected override service = inject(VendedorService);

  readonly tableColumns = VENDEDOR_TABLE_COLUMNS;
}