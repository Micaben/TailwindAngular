import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DetailColumn } from '../../components/detail-table/detail-table.interface';
import { IconComponent } from '../../../shared/components/icons/icon.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputFieldComponent } from "../form/input/input-field.component";

@Component({
  selector: 'app-detail-table',
  standalone: true,
  imports: [IconComponent, CommonModule,
    FormsModule, InputFieldComponent],
  templateUrl: './detail-table.component.html'
})

export class DetailTableComponent {

  @Input() columns: DetailColumn[] = [];
  showProductosModal = false;
  @Input() data: any[] = [];
  @Output() searchProduct = new EventEmitter<number>();
  @Output() remove = new EventEmitter<number>();
  @Output() cantidadChange = new EventEmitter<any>();
  @Output() precioChange = new EventEmitter<any>();
  @Output() addRow = new EventEmitter<void>();
  selectProduct(index: number) {
    this.searchProduct.emit(index);
  }

  deleteRow(index: number) {
    this.remove.emit(index);
  }

  updateCantidad(item: any, value: number) {
    this.cantidadChange.emit({
      item,
      value
    });
  }

  updatePrecio(item: any, value: any) {
    item.precio = value;
    item.total = item.cantidad * item.precio;
  }
}