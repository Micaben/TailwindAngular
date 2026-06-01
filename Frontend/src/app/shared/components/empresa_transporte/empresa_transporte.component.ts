import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { InputFieldComponent } from '../form/input/input-field.component';
import { ModalComponent } from '../ui/modal/modal.component';
import { AutoFocusFirstDirective } from '../../directives/autofocus';
import { CrudTableComponent } from '../../components/tabla/crud-table.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { EmpresatransporteService } from '../../../core/services/empresa_transporte.services';
import { Empresa_transporte } from '../../components/empresa_transporte/empresa_transporte.model';
import { Empresatransporte_TABLE_COLUMNS } from '../../components/tabla/empresatransporte_table_config';
import { BaseCrudComponent } from '../base_crud_component/base_crud.component';
import { LabelDirective } from '../../../shared/directives/label.directive';

@Component({
  selector: 'app-empresatransporte',
  standalone: true,
  templateUrl: './empresa_transporte.component.html',
  imports: [
    FormsModule,
    CrudTableComponent,
    LabelDirective,
    ModalComponent,
    FooterComponent,
    InputFieldComponent,
    AutoFocusFirstDirective
  ]
})
export class Empresa_transporteComponent
  extends BaseCrudComponent<Empresa_transporte> {
  protected override service = inject(EmpresatransporteService);
  readonly tableColumns = Empresatransporte_TABLE_COLUMNS;
  
}