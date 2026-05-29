import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { InputFieldComponent } from '../form/input/input-field.component';
import { ModalComponent } from '../ui/modal/modal.component';
import { AutoFocusFirstDirective } from '../../directives/autofocus';
import { CrudTableComponent } from '../../components/tabla/crud-table.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { LineaService } from '../../../core/services/linea.service';
import { Modelobase } from '../../../core/models/modelobase.model';
import { LINEA_TABLE_COLUMNS } from '../../components/tabla/linea_table_config';
import { BaseCrudComponent } from '../base_crud_component/base_crud.component';

@Component({
  selector: 'app-linea',
  standalone: true,
  templateUrl: './linea.component.html',
  imports: [
    FormsModule,
    CrudTableComponent,
    ModalComponent,
    FooterComponent,
    InputFieldComponent,
    AutoFocusFirstDirective
  ]
})
export class LineaComponent
  extends BaseCrudComponent<Modelobase> {

  protected override service = inject(LineaService);

  readonly tableColumns = LINEA_TABLE_COLUMNS;
}