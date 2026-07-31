import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { ModalComponent } from '../../shared/components/ui/modal/modal.component';
import { AutoFocusFirstDirective } from '../../shared/directives/autofocus';
import { InputFieldComponent } from '../../shared/components/form/input/input-field.component';
import { LabelDirective } from "../../shared/directives/label.directive";
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { Option } from '../../core/models/option.model';
import { SelectComponent } from '../../shared/components/form/select/select.component';

@Component({
  selector: 'app-transportista-form-model',
  standalone: true,
  templateUrl: './transportista-form-model.component.html',
  imports: [FormsModule, ModalComponent, InputFieldComponent, FooterComponent, SelectComponent, AutoFocusFirstDirective, LabelDirective]
})
export class TransportistaFormModelComponent {

  @Input({ required: true }) state!: any;
  @Input() submitted = false;
  @Output() save = new EventEmitter<NgForm>();
  @Output() close = new EventEmitter<void>();
  @Input() empresa_transporteOptions: Option[] = [];
  @Input() tipoDocumentoOptions: Option[] = [];
  @Output() create = new EventEmitter<void>();
  focusCounter = 0;
  //CAMBIO PRO: actualizar campo sin mutar directamente
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
      ruc: '',
      nombres: '',
      apellidopaterno: '',
      apellidomaterno: '',
      dni: '',
      licencia: '',
      unidad: '',
      placa: '',
      tipo_documento: '',
      ...this.state?.selected
    };
  }
}