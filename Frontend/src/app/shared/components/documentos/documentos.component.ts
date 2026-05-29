import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { InputFieldComponent } from '../form/input/input-field.component';
import { ModalComponent } from '../ui/modal/modal.component';
import { AutoFocusFirstDirective } from '../../directives/autofocus';
import { CrudTableComponent } from '../../components/tabla/crud-table.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { DocumentosService } from '../../../core/services/documentos.service';
import { Modelobase } from '../../../core/models/modelobase.model';
import { DOCUMENTOS_TABLE_COLUMNS } from '../../components/tabla/documentos_table_config';
import { BaseCrudComponent } from '../base_crud_component/base_crud.component';

@Component({
  selector: 'app-documentos',
  standalone: true,
  templateUrl: './documentos.component.html',
  imports: [
    FormsModule,
    CrudTableComponent,
    ModalComponent,
    FooterComponent,
    InputFieldComponent,
    AutoFocusFirstDirective
  ]
})
export class DocumentosComponent
  extends BaseCrudComponent<Modelobase> {

  protected override service = inject(DocumentosService);

  readonly tableColumns = DOCUMENTOS_TABLE_COLUMNS;
}