import { Component, inject, OnInit } from '@angular/core';
import { CrudTableComponent } from '../../shared/components/tables/crud-table/crud-table.component';
import { DocumentosService } from '../../core/services/documentos.service';
import { Modelobase } from '../../core/models/modelobase.model'
import { DOCUMENTOS_TABLE_COLUMNS } from './documentos_table_config';
import { BaseCrudComponent } from '../../shared/components/base/components/base_crud.component';
import { DocumentosFormModelComponent } from './documentos-form-model.component';

@Component({
  selector: 'app-documentos-page',
  standalone: true,
  templateUrl: './documentos.page.html',
  imports: [
    CrudTableComponent,
    DocumentosFormModelComponent,

  ]
})
export class DocumentosPage extends BaseCrudComponent<Modelobase> {

  protected override service = inject(DocumentosService);

  readonly tableColumns = DOCUMENTOS_TABLE_COLUMNS;
}