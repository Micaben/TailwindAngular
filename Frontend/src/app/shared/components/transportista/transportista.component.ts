import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { InputFieldComponent } from '../form/input/input-field.component';
import { ModalComponent } from '../ui/modal/modal.component';
import { AutoFocusFirstDirective } from '../../directives/autofocus';
import { CrudTableComponent } from '../../components/tabla/crud-table.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { TransportistaService } from '../../../core/services/transportista.service';
import { TRANSPORTISTA_TABLE_COLUMNS } from '../../components/tabla/transportista_table_config';
import { BaseCrudComponent } from '../base_crud_component/base_crud.component';
import { SelectComponent } from "../form/select/select.component";
import { Option } from '../../../core/models/option.model';
import { Transportista } from './transportista.model';
import { OptionsService } from '../../../core/services/options.service';
import { LabelDirective } from '../../../shared/directives/label.directive';

@Component({
  selector: 'app-transportista',
  standalone: true,
  templateUrl: './transportista.component.html',
  imports: [
    FormsModule,
    LabelDirective,
    CrudTableComponent,
    ModalComponent,
    FooterComponent,
    InputFieldComponent,
    AutoFocusFirstDirective,
    SelectComponent
  ]
})

export class TransportistaComponent
  extends BaseCrudComponent<Transportista> {
  protected override service = inject(TransportistaService);
  private optionsService = inject(OptionsService);
  empresa_transporteOptions: Option[] = [];
  tipo_documentoOptions: Option[] = [];
  readonly tableColumns = TRANSPORTISTA_TABLE_COLUMNS;

  override ngOnInit(): void {
    super.ngOnInit();
    this.loadEmpresaTransporte();
    this.loadOptions();
  }

  loadEmpresaTransporte(): void {
    this.optionsService
      .getOptions('http://localhost:3000/empresa_transporte')
      .subscribe(data => {
        this.empresa_transporteOptions = data.map((item: any) => ({
          value: item.ruc,
          label: item.razon_social,
          ruc: item.ruc
        }));
console.log(this.state().selected);
      });
  }

  loadSelect(endpoint: string, property: keyof this): void {
    this.optionsService
      .getOptions(endpoint)
      .subscribe(data => {
        console.log(data);
        (this[property] as Option[]) = data;
      });
  }

  loadOptions(): void {

    this.loadSelect(
      'http://localhost:3000/tipo_documento',
      'tipo_documentoOptions'
    );
  }

  showError(control: any): boolean {
    return (control.invalid && (control.touched || this.submitted()));
  }
}