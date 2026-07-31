import { Component, EventEmitter, Input, Output, signal, inject, OnInit } from '@angular/core';
import { TableColumn } from '../tables/table/table.component';
import { ModalComponent } from '../../../shared/components/ui/modal/modal.component';
import { FormsModule } from '@angular/forms';
import { InputFieldComponent } from '../../../shared/components/form/input/input-field.component';
import { CrudTableComponent } from '../tables/crud-table/crud-table.component';
import { SelectComponent } from "../../../shared/components/form/select/select.component";
import { Option } from '../../../core/models/option.model';

@Component({
  selector: 'app-document-search',
  standalone: true,
  templateUrl: './document-search.component.html',
  imports: [ModalComponent, CrudTableComponent, SelectComponent, FormsModule, InputFieldComponent]
})

export class DocumentSearchComponent {
  @Input() isOpen = false;
  @Input() title = '';
  @Input() columns: TableColumn[] = [];
  @Input() data: any[] = [];
  @Output() close = new EventEmitter<void>();
  @Output() buscar = new EventEmitter<{
    texto: string;
    mes: string;
    anio: string;
  }>();

  @Output() select = new EventEmitter<any>();

  textoBusqueda = '';
  emitBuscar() {
    this.buscar.emit({
      texto: this.textoBusqueda,
      mes: this.mesSeleccionado,
      anio: this.anioSeleccionado
    });

  }
  mesSeleccionado = String(new Date().getMonth() + 1);
  anioSeleccionado = String(new Date().getFullYear());

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

}