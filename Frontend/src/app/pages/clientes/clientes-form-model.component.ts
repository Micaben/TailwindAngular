import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { ModalComponent } from '../../shared/components/ui/modal/modal.component';
import { AutoFocusFirstDirective } from '../../shared/directives/autofocus';
import { InputFieldComponent } from '../../shared/components/form/input/input-field.component';
import { LabelDirective } from "../../shared/directives/label.directive";
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { Option } from '../../core/models/option.model';
import { Ubigeo } from '../../shared/components/ubigeo/ubigeo_model';
import { UbigeoComponent } from '../../shared/components/ubigeo/ubigeo.component';
import { SelectComponent } from '../../shared/components/form/select/select.component';
import { SwitchToggleComponent } from '../../shared/components/ui/switchtoggle/switch_toggle.component';

@Component({
  selector: 'app-clientes-form-model',
  standalone: true,
  templateUrl: './clientes-form-model.component.html',
  imports: [FormsModule, ModalComponent, InputFieldComponent, FooterComponent, SelectComponent,
    SwitchToggleComponent, AutoFocusFirstDirective, LabelDirective, UbigeoComponent]
})
export class ClientesFormModelComponent {

  showUbigeoModal = false;
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

  openUbigeoModal() {
    this.showUbigeoModal = true;
  }

  selectUbigeo(ubigeo: Ubigeo) {
    this.state.selected = {
      ...this.state.selected,
      ubigeo: ubigeo.ubi_codigo,
      departamento: ubigeo.ubi_departamento,
      provincia: ubigeo.ubi_provincia,
      distrito: ubigeo.ubi_distrito
    };
    this.showUbigeoModal = false;
  }

  get selectedSafe() {
    return {      
      ruc: '',
      nombres: '',
      apellido_paterno: '',
      apellido_materno: '',
      nombre_comercial: '',
      razon_social: '',
      direccion: '',
      telefono: '',
      email: '',
      nombre_contacto: '',
      cargo_contacto: '',
      ubigeo: '',
      ag_retencion: false,
      estado: true,
      ...this.state?.selected
    };
  }
}