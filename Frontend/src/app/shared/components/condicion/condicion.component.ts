import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { InputFieldComponent } from '../form/input/input-field.component';
import { ModalComponent } from '../ui/modal/modal.component';
import { AutoFocusFirstDirective } from '../../directives/autofocus';
import { CrudTableComponent } from '../../components/tabla/crud-table.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CondicionService } from '../../../core/services/condicion.service';
import { CONDICION_TABLE_COLUMNS } from '../../components/tabla/condicion_table_config'
import { BaseCrudComponent } from '../base_crud_component/base_crud.component';
import { Condicion } from './condicion.model';
@Component({
  selector: 'app-condicion',
  standalone: true,
  templateUrl: './condicion.component.html',
  imports: [
    CommonModule,
    FormsModule,
    CrudTableComponent,
    ModalComponent,
    FooterComponent,
    InputFieldComponent,
    AutoFocusFirstDirective
  ]
})
export class CondicionComponent
  extends BaseCrudComponent<Condicion> {
  protected override service = inject(CondicionService);
  
  readonly tableColumns = CONDICION_TABLE_COLUMNS;
  
}