import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { InputFieldComponent } from '../form/input/input-field.component';
import { ModalComponent } from '../ui/modal/modal.component';
import { AutoFocusFirstDirective } from '../../directives/autofocus';
import { CrudTableComponent } from '../../components/tabla/crud-table.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { AlmacenesService } from '../../../core/services/almacenes.services';
import { Almacen } from '../../components/almacenes/almacenes.model';
import { ALMACENES_TABLE_COLUMNS } from '../../components/tabla/almacenes_table_config';
import { BaseCrudComponent } from '../base_crud_component/base_crud.component';

@Component({
  selector: 'app-almacenes',
  standalone: true,
  templateUrl: './almacenes.component.html',
  imports: [
    FormsModule,
    CrudTableComponent,
    ModalComponent,
    FooterComponent,
    InputFieldComponent,
    AutoFocusFirstDirective
  ]
})
export class AlmacenesComponent
 extends BaseCrudComponent<Almacen> {

  protected override service =
    inject(AlmacenesService);

  readonly tableColumns =
    ALMACENES_TABLE_COLUMNS;
}