import { Component, inject, OnInit } from '@angular/core';
import { CrudTableComponent } from '../../shared/components/tables/crud-table/crud-table.component';
import { TipocambioService } from '../../core/services/tipocambio.service';
import { Tipocambio } from './tipocambio.model'
import { TIPOCAMBIO_TABLE_COLUMNS } from '../../pages/tipocambio/tipocambio_table_config';
import { BaseCrudComponent } from '../../shared/components/base/components/base_crud.component';
import { TipocambioFormModalComponent } from './tipocambio-form-model.component';
import { formatInputDate } from '../../shared/utils/date.utils';
import { getFechaHoy } from '../../shared/utils/date.utils';
import { FormsModule } from '@angular/forms';
import { Option } from '../../core/models/option.model';
import { SelectComponent } from "../../shared/components/form/select/select.component";
import { signal } from '@angular/core';
import { finalize } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-tipocambio-page',
  standalone: true,
  templateUrl: './tipocambio.page.html',
  imports: [
    CrudTableComponent,
    TipocambioFormModalComponent,
    FormsModule,
    SelectComponent
  ]
})
export class TipocambioPage
  extends BaseCrudComponent<Tipocambio>
  implements OnInit {
  protected override service = inject(TipocambioService);
  readonly tableColumns = TIPOCAMBIO_TABLE_COLUMNS;

  mesSeleccionado = signal(
    String(new Date().getMonth() + 1)
  );

  anioSeleccionado = signal(
    String(new Date().getFullYear())
  );

  mesOptions: Option[] = [
    { value: '1', label: 'Enero' },
    { value: '2', label: 'Febrero' },
    { value: '3', label: 'Marzo' },
    { value: '4', label: 'Abril' },
    { value: '5', label: 'Mayo' },
    { value: '6', label: 'Junio' },
    { value: '7', label: 'Julio' },
    { value: '8', label: 'Agosto' },
    { value: '9', label: 'Septiembre' },
    { value: '10', label: 'Octubre' },
    { value: '11', label: 'Noviembre' },
    { value: '12', label: 'Diciembre' }
  ];

  anioOptions: Option[] = Array.from(
    { length: 10 },
    (_, i) => {
      const year = String(
        new Date().getFullYear() - i
      );

      return {
        value: year,
        label: year
      };
    }
  );

  override ngOnInit(): void {
    this.buscarPorPeriodo();
  }

  protected override getInitialData():
    Partial<Tipocambio> {

    return {
      fecha: getFechaHoy(),
      compra: 0,
      venta: 0
    };
  }

  override afterSave(): void {
    this.buscarPorPeriodo();
  }

  override openEdit(item: Tipocambio): void {
    this.state.update(state => ({
      ...state,
      selected: {
        ...item,
        fecha: item.fecha
          ? formatInputDate(item.fecha)
          : ''
      },
      modo: 'editar',
      isOpen: true,
      formSubmitted: false
    }));

  }

  buscarPorPeriodo(): void {
    this.service
      .getByPeriodo(
        this.mesSeleccionado(),
        this.anioSeleccionado()
      )
      .subscribe({
        next: data => {
          this.setItems(data);
          console.log('State items:', this.state().items);
        },
        error: err => {
          console.error(err);
        }
      });
  }

  onMesChange(value: string): void {
    this.mesSeleccionado.set(value);
    this.buscarPorPeriodo();
  }

  onAnioChange(value: string): void {
    this.anioSeleccionado.set(value);
    this.buscarPorPeriodo();
  }

  override save(form: NgForm): void {

  this.setFormSubmitted(true);

  if (form.invalid) return;

  this.setLoading(true);

  const currentState = this.state();

  const request$ =
    currentState.modo === 'crear'
      ? this.service.create(currentState.selected)
      : this.service.update(
          currentState.selected.id!,
          currentState.selected
        );

  request$
    .pipe(
      finalize(() => this.setLoading(false))
    )
    .subscribe({
      next: (res) => {

        this.state.update(s => ({
          ...s,
          modo: 'editar',
          selected: {
            ...s.selected,
            ...res,
            fecha: res.fecha
              ? formatInputDate(res.fecha)
              : ''
          },
          isOpen: true
        }));

        this.buscarPorPeriodo();

      },
      error: err => {
        console.error(err);
      }
    });

}
}