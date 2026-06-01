import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { InputFieldComponent } from '../form/input/input-field.component';
import { LabelDirective } from '../../../shared/directives/label.directive';
import { ModalComponent } from '../ui/modal/modal.component';
import { AutoFocusFirstDirective } from '../../directives/autofocus';
import { CrudTableComponent } from '../../components/tabla/crud-table.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { UnidadMedidaService } from '../../../core/services/unidadmedida.service';
import { UNIDADMEDIDA_TABLE_COLUMNS } from '../../components/tabla/unidadmedida_table_config';
import { BaseCrudComponent } from '../base_crud_component/base_crud.component';
import { Modelobase } from '../../../core/models/modelobase.model';

@Component({
  selector: 'app-unidadmedida',
  standalone: true,
  templateUrl: './unidadmedida.component.html',
  imports: [
    FormsModule,
    CrudTableComponent,
    LabelDirective,
    ModalComponent,
    FooterComponent,
    InputFieldComponent,
    AutoFocusFirstDirective,
  ]
})

export class UnidadMedidaComponent
 extends BaseCrudComponent<Modelobase> {
   protected override service = inject(UnidadMedidaService);
   readonly tableColumns = UNIDADMEDIDA_TABLE_COLUMNS;

}