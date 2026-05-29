import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { InputFieldComponent } from '../form/input/input-field.component';
import { ModalComponent } from '../ui/modal/modal.component';
import { AutoFocusFirstDirective } from '../../directives/autofocus';
import { CrudTableComponent } from '../tabla/crud-table.component';
import { FooterComponent } from '../footer/footer.component';
import { SeriesService } from '../../../core/services/series.service';
import { Serie } from '../../../core/models/serie.model';
import { SERIES_TABLE_COLUMNS } from '../tabla/series_table_config';
import { SelectComponent } from "../form/select/select.component";
import { BaseCrudComponent } from '../base_crud_component/base_crud.component';
import { OptionsService } from '../../../core/services/options.service';
import { Option } from '../../../core/models/option.model';

@Component({
  selector: 'app-series',
  standalone: true,
  templateUrl: './series.component.html',
  imports: [
    FormsModule,
    CrudTableComponent,
    SelectComponent,
    ModalComponent,
    FooterComponent,
    InputFieldComponent,
    AutoFocusFirstDirective
  ]
})
export class SeriesComponent
  extends BaseCrudComponent<Serie> {
  protected override service = inject(SeriesService);
  private optionsService = inject(OptionsService);
  comprobanteOptions: Option[] = [];
  readonly tableColumns = SERIES_TABLE_COLUMNS;

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
  }

  showError(control: any): boolean {
    return (control.invalid && (control.touched || this.submitted()));
  }
}