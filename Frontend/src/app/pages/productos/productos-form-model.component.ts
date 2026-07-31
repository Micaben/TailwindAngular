import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { ModalComponent } from '../../shared/components/ui/modal/modal.component';
import { AutoFocusFirstDirective } from '../../shared/directives/autofocus';
import { InputFieldComponent } from '../../shared/components/form/input/input-field.component';
import { LabelDirective } from "../../shared/directives/label.directive";
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { Option } from '../../core/models/option.model';
import { SelectComponent } from '../../shared/components/form/select/select.component';
import { SwitchToggleComponent } from '../../shared/components/ui/switchtoggle/switch_toggle.component';

@Component({
  selector: 'app-productos-form-model',
  standalone: true,
  templateUrl: './productos-form-model.component.html',
  imports: [FormsModule, ModalComponent, InputFieldComponent, FooterComponent, SelectComponent,
    SwitchToggleComponent, AutoFocusFirstDirective, LabelDirective]
})
export class ProductosFormModelComponent {

  @Input({ required: true }) state!: any;
  @Input() submitted = false;
  @Output() save = new EventEmitter<NgForm>();
  @Output() close = new EventEmitter<void>();
  @Input() naturalezaOptions: Option[] = [];
  @Input() lineaOptions: Option[] = [];
  @Input() marcaOptions: Option[] = [];
  @Input() colorOptions: Option[] = [];
  @Input() sublineaOptions: Option[] = [];
  @Input() proveedorOptions: Option[] = [];
  @Input() unidadmedidaOptions: Option[] = [];
  @Output() lineaChanged = new EventEmitter<string>();
  @Output() create = new EventEmitter<void>();
  focusCounter = 0;

  onLineaChange(lineaId: string): void {

    // Actualiza el modelo
    this.update('linea', lineaId);

    // Limpia la sublinea seleccionada
    this.update('sublinea', null);

    // Notifica al componente padre
    this.lineaChanged.emit(lineaId);
  }

  onProveedorChange(ruc: string) {
    this.update('proveedor', ruc);
  }

  update(field: string, value: any) {
    this.state.selected = {
      ...this.state.selected,
      [field]: value
    };
  }

  onCreate() {
    this.create.emit();
    this.focusCounter++;
  }

  get selectedSafe() {
    return {
      naturaleza: '',
      linea: '',
      sublinea: '',
      codigo: '',
      descripcion: '',
      unidad_medida: '',
      color: '',
      peso: '',
      codigo_barras: '',
      numero_serie: '',
      numero_lote: '',
      codigo_sunat: '',
      codigo_gtin: '',
      principio: '',
      marca: '',
      procedencia: '',
      fecha_vencimiento: null,
      proveedor_nombre: '',
      proveedor: '',
      estado: true,
      ...this.state?.selected
    };
  }
}