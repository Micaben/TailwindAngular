import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { LabelDirective } from '../../../shared/directives/label.directive';
import { InputFieldComponent } from '../form/input/input-field.component';
import { ModalComponent } from '../ui/modal/modal.component';
import { AutoFocusFirstDirective } from '../../directives/autofocus';
import { CrudTableComponent } from '../../components/tabla/crud-table.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { VendedorService } from '../../../core/services/vendedor.service';
import { VENDEDOR_TABLE_COLUMNS } from '../../components/tabla/vendedor_table_config';
import { BaseCrudComponent } from '../base_crud_component/base_crud.component';
import { SwitchToggleComponent } from '../switchtoggle/switch_toggle.component';
import { Vendedor } from './vendedor.model';

@Component({
  selector: 'app-vendedor',
  standalone: true,
  templateUrl: './vendedor.component.html',
  imports: [
    FormsModule,
    LabelDirective,
    CrudTableComponent,
    ModalComponent,
    SwitchToggleComponent,
    FooterComponent,
    InputFieldComponent,
    AutoFocusFirstDirective,
  ]
})
export class VendedorComponent
  extends BaseCrudComponent<Vendedor> {
  protected override service = inject(VendedorService);
  readonly tableColumns = VENDEDOR_TABLE_COLUMNS;

}