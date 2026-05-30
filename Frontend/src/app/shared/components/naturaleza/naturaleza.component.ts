import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { InputFieldComponent } from '../form/input/input-field.component';
import { ModalComponent } from '../ui/modal/modal.component';
import { AutoFocusFirstDirective } from '../../directives/autofocus';
import { CrudTableComponent } from '../../components/tabla/crud-table.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { NaturalezaService } from '../../../core/services/naturaleza.service';
import { Modelobase } from '../../../core/models/modelobase.model';
import { NATURALEZA_TABLE_COLUMNS } from '../../components/tabla/naturaleza_table_config';
import { BaseCrudComponent } from '../base_crud_component/base_crud.component';

@Component({
  selector: 'app-naturaleza',
  standalone: true,
  templateUrl: './naturaleza.component.html',
  imports: [
    FormsModule,
    CrudTableComponent,
    ModalComponent,
    FooterComponent,
    InputFieldComponent,
    AutoFocusFirstDirective
  ]
})
export class NaturalezaComponent
  extends BaseCrudComponent<Modelobase> {

  protected override service = inject(NaturalezaService);

  readonly tableColumns = NATURALEZA_TABLE_COLUMNS;
}