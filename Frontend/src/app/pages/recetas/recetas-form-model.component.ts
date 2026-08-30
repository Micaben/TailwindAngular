import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { AutoFocusFirstDirective } from '../../shared/directives/autofocus';
import { InputFieldComponent } from '../../shared/components/form/input/input-field.component';
import { LabelDirective } from "../../shared/directives/label.directive";
import { Option } from '../../core/models/option.model';
import { SelectComponent } from '../../shared/components/form/select/select.component';
import { ModalComponent } from '../../shared/components/ui/modal/modal.component';
import { ProveedorSelectorComponent } from '../../shared/selectors/proveedor-selector.component';
import { Proveedores } from '../proveedores/proveedores.model';
import { BaseDocumentForm } from '../../shared/components/models/base-document-form';
import { CommonModule } from '@angular/common';
import { DetalleReceta } from './recetas.model';

@Component({
  selector: 'app-recetas-form-model',
  standalone: true,
  templateUrl: './recetas-form-model.component.html',
  imports: [FormsModule, ModalComponent, InputFieldComponent, SelectComponent,
    AutoFocusFirstDirective, LabelDirective, ProveedorSelectorComponent, CommonModule]
})
export class RecetasFormModelComponent extends BaseDocumentForm {
  showClienteModal = false;
  showBuscarModal = false;
  @Input() medidas: DetalleReceta[] = [];
  @Input({ required: true }) state!: any;
  @Input() submitted = false;
  @Output() save = new EventEmitter<NgForm>();
  @Output() close = new EventEmitter<void>();
  @Input() serieOptions: Option[] = [];
  @Input() monedaOptions: Option[] = [];
  @Input() selected: any;
  @Output() serieChange = new EventEmitter<string>();
  @Output() valueChange =
    new EventEmitter<{
      item: DetalleReceta;
      field: keyof DetalleReceta;
      value: any;
    }>();
  documentos: any[] = [];
  update(field: string, value: any): void {
    this.state.selected = {
      ...this.state.selected,
      [field]: value
    };
  }
  updateDetalle<K extends keyof DetalleReceta>(
    item: DetalleReceta,
    field: K,
    value: DetalleReceta[K]
  ): void {
    item[field] = value;

    this.valueChange.emit({
      item,
      field,
      value
    });
  }
  openClienteModal() {
    this.showClienteModal = true;
  }

  openBuscarModal() {
    this.showBuscarModal = true;
  }

  selectProveedor(proveedor: Proveedores) {
    this.state.selected = {
      ...this.state.selected,
      ruc: proveedor.ruc,
      razon_social: proveedor.razon_social,
    };
    this.showClienteModal = false;
  }

  selectBuscar(buscar: Proveedores) {
    this.state.selected = {
      ...this.state.selected,
      ruc: buscar.ruc,
      razon_social: buscar.razon_social,
    };
    this.showBuscarModal = false;
  }

  get selectedSafe() {
    return {
      id: undefined,
      documento: '',
      numero: '',
      fecha: '',
      ruc: '',
      razon_social: '',
      fecha_compra: '',
      serie_numero: '',
      guia_remision: '',
      ocompra: '',
      referencia: '',
      total: 0,
      ...this.state?.selected
    };
  }

  onSerieChange(value: string) {
    this.update('serie', value);
    this.serieChange.emit(value);
  }

  onProveedorChange(ruc: string) {
    this.update('proveedor', ruc);
  }
}