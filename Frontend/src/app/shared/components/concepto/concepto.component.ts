import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { InputFieldComponent } from '../form/input/input-field.component';
import { ModalComponent } from '../ui/modal/modal.component';
import { AutoFocusFirstDirective } from '../../directives/autofocus';
import { CrudTableComponent } from '../../components/tabla/crud-table.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ConceptoService } from '../../../core/services/concepto.services';
import { CONCEPTO_TABLE_COLUMNS } from '../../components/tabla/concepto_table_config';
import { BaseCrudComponent } from '../base_crud_component/base_crud.component';
import { SelectComponent } from "../form/select/select.component";
import { Option } from '../../../core/models/option.model';
import { Concepto } from './concepto.model';
import { OptionsService } from '../../../core/services/options.service';

@Component({
  selector: 'app-concepto',
  standalone: true,
  templateUrl: './concepto.component.html',
  imports: [
    CommonModule,
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
  extends BaseCrudComponent<Concepto> {
  protected override service = inject(ConceptoService);
  private optionsService = inject(OptionsService);

  comprobanteOptions: Option[] = [];
  tipoFacturaOptions: Option[] = [];
  tipoOperacionOptions: Option[] = [];
  tipoAfectacionOptions: Option[] = [];
  tiponcOptions: Option[] = [];

  readonly tableColumns = CONCEPTO_TABLE_COLUMNS;
  
 override ngOnInit(): void {

  super.ngOnInit();

  this.loadOptions();

}

  loadSelect(endpoint: string, property: keyof this): void {
    this.optionsService
      .getOptions(endpoint)
      .subscribe(data => {
        (this[property] as Option[]) = data;
      });
  }

  loadOptions(): void {
    this.loadSelect(
      'http://localhost:3000/documentos',
      'comprobanteOptions'
    );

    this.loadSelect(
      'http://localhost:3000/tipo_factura',
      'tipoFacturaOptions'
    );

    this.loadSelect(
      'http://localhost:3000/tipo_operacion',
      'tipoOperacionOptions'
    );
    
    this.loadSelect(
      'http://localhost:3000/tipo_nc',
      'tiponcOptions'
    );
  }

  showError(control: any): boolean {
    return (control.invalid && (control.touched || this.submitted()) );
  }
}