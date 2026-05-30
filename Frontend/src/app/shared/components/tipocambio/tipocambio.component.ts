import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { InputFieldComponent } from '../form/input/input-field.component';
import { ModalComponent } from '../ui/modal/modal.component';
import { AutoFocusFirstDirective } from '../../directives/autofocus';
import { CrudTableComponent } from '../../components/tabla/crud-table.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { TipocambioService } from '../../../core/services/tipocambio.service';
import { Tipocambio } from './tipocambio.model';
import { TIPOCAMBIO_TABLE_COLUMNS } from '../../components/tabla/tipocambio_table_config';
import { BaseCrudComponent } from '../base_crud_component/base_crud.component';
import { formatInputDate } from '../../../shared/services/date.utils';
import { getFechaHoy } from '../../services/date.utils';

@Component({
  selector: 'app-tipocambio',
  standalone: true,
  templateUrl: './tipocambio.component.html',
  imports: [
    FormsModule,
    CrudTableComponent,
    ModalComponent,
    FooterComponent,
    InputFieldComponent,
    AutoFocusFirstDirective
  ]
})

export class TipocambioComponent
  extends BaseCrudComponent<Tipocambio> {
  protected override service = inject(TipocambioService);

  readonly tableColumns = TIPOCAMBIO_TABLE_COLUMNS;
  protected override getInitialData(): Partial<Tipocambio> {
    return {
      fecha: getFechaHoy(),
      compra: 0,
      venta: 0
    };
  }
  override openEdit(item: Tipocambio): void {

    this.state.update(state => ({
      ...state,
      selected: {
        ...item,
        fecha: formatInputDate(item.fecha)
      },
      modo: 'editar',
      isOpen: true,
      formSubmitted: false
    }));

  }
}