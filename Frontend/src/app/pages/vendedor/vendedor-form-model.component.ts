import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { InputFieldComponent } from '../../shared/components/form/input/input-field.component';
import { ModalComponent } from '../../shared/components/ui/modal/modal.component';
import { AutoFocusFirstDirective } from '../../shared/directives/autofocus';
import { LabelDirective } from "../../shared/directives/label.directive";
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { SwitchToggleComponent } from '../../shared/components/ui/switchtoggle/switch_toggle.component';

@Component({
  selector: 'app-vendedor-form-modal',
  standalone: true,
  templateUrl: './vendedor-form-model.component.html',
  imports: [FormsModule, ModalComponent, InputFieldComponent, FooterComponent, AutoFocusFirstDirective, LabelDirective, SwitchToggleComponent]
})

export class VendedorFormModelComponent {

  @Input({ required: true }) state!: any;
  @Input() submitted = false;
  @Output() save = new EventEmitter<NgForm>();
  @Output() close = new EventEmitter<void>();
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
      codigo: '',
      nombres: '',
      direccion: '',
      telefono: '',
      correo: '',
      empresa: '',
      dni: '',
      estado: true,
      ...this.state?.selected
    };
  }
}