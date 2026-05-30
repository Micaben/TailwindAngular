import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { InputFieldComponent } from '../form/input/input-field.component';
import { ModalComponent } from '../ui/modal/modal.component';
import { AutoFocusFirstDirective } from '../../directives/autofocus';
import { CrudTableComponent } from '../../components/tabla/crud-table.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { SublineaService } from '../../../core/services/sublinea.service';
import { SUBLINEA_TABLE_COLUMNS } from '../../components/tabla/sublinea_table_config';
import { BaseCrudComponent } from '../base_crud_component/base_crud.component';
import { SelectComponent } from "../form/select/select.component";
import { Option } from '../../../core/models/option.model';
import { Sublinea } from './sublinea.model';
import { OptionsService } from '../../../core/services/options.service';

@Component({
  selector: 'app-sublinea',
  standalone: true,
  templateUrl: './sublinea.component.html',
  imports: [
    FormsModule,
    CrudTableComponent,
    ModalComponent,
    FooterComponent,
    InputFieldComponent,
    AutoFocusFirstDirective,
    SelectComponent
  ]
})
export class SublineaComponent
  extends BaseCrudComponent<Sublinea> {
  protected override service = inject(SublineaService);
  private optionsService = inject(OptionsService);
  lineaOptions: Option[] = [];
  readonly tableColumns = SUBLINEA_TABLE_COLUMNS;

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
      'http://localhost:3000/linea',
      'lineaOptions'
    );

  }

  showError(control: any): boolean {
    return (control.invalid && (control.touched || this.submitted()));
  }
}