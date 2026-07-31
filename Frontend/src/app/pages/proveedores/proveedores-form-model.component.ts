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
  selector: 'app-proveedores-form-model',
  standalone: true,
  templateUrl: './proveedores-form-model.component.html',
  imports: [FormsModule, ModalComponent, InputFieldComponent, FooterComponent, SelectComponent,
    SwitchToggleComponent, AutoFocusFirstDirective, LabelDirective]
})
export class ProveedoresFormModelComponent {

  @Input({ required: true }) state!: any;
  @Input() submitted = false;
  @Output() save = new EventEmitter<NgForm>();
  @Output() close = new EventEmitter<void>();
  @Input() tipoDocumentoOptions: Option[] = [];
  @Input() tipoPersonaOptions: Option[] = [];
  @Input() monedaOptions: Option[] = [];
  @Input() vendedorOptions: Option[] = [];
  @Input() condicionVentaOptions: Option[] = [];
  @Output() create = new EventEmitter<void>();
  focusCounter = 0;

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
      tipo_documento: '',
      ruc: '',
      tipo_persona: '',
      nombres: '',
      apellido_paterno: '',
      apellido_materno: '',
      nombre_comercial: '',
      razon_social: '',
      direccion: '',
      nombre_contacto: '',
      telefono: '',
      pais: '',
      estado: true,
      ...this.state?.selected
    };
  }
}