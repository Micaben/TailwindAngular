import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { InputFieldComponent } from '../form/input/input-field.component';
import { ModalComponent } from '../ui/modal/modal.component';
import { AutoFocusFirstDirective } from '../../directives/autofocus';
import { CrudTableComponent } from '../../components/tabla/crud-table.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ColorService } from '../../../core/services/color.service';
import { Modelobase } from '../../../core/models/modelobase.model';
import { COLOR_TABLE_COLUMNS } from '../../components/tabla/color_table_config';
import { BaseCrudComponent } from '../base_crud_component/base_crud.component';

@Component({
  selector: 'app-color',
  standalone: true,
  templateUrl: './color.component.html',
  imports: [
    FormsModule,
    CrudTableComponent,
    ModalComponent,
    FooterComponent,
    InputFieldComponent,
    AutoFocusFirstDirective
  ]
})
export class ColorComponent
  extends BaseCrudComponent<Modelobase> {

  protected override service = inject(ColorService);

  readonly tableColumns = COLOR_TABLE_COLUMNS;
}