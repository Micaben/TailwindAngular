import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { InputFieldComponent } from '../form/input/input-field.component';
import { ModalComponent } from '../ui/modal/modal.component';
import { AutoFocusFirstDirective } from '../../directives/autofocus';
import { CrudTableComponent } from '../../components/tabla/crud-table.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ConceptoService } from '../../../core/services/concepto.services';
import { Modelobase } from '../../../core/models/modelobase.model';
import { CONCEPTO_TABLE_COLUMNS } from '../../components/tabla/concepto_table_config';
import { BaseCrudComponent } from '../base_crud_component/base_crud.component';
import { SelectComponent } from "../form/select/select.component";

@Component({
  selector: 'app-concepto',
  standalone: true,
  templateUrl: './concepto.component.html',
  imports: [
    FormsModule,
    CrudTableComponent,
    ModalComponent,
    FooterComponent,
    InputFieldComponent,
    AutoFocusFirstDirective,
    SelectComponent
]
})
export class ConceptoComponent
  extends BaseCrudComponent<Modelobase> {

  protected override service =
    inject(ConceptoService);

  readonly tableColumns =
    CONCEPTO_TABLE_COLUMNS;
}