import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { ModalComponent } from '../ui/modal/modal.component';
import { AutoFocusFirstDirective } from '../../directives/autofocus';
import { InputFieldComponent } from '../form/input/input-field.component';
import { LabelDirective } from "../../directives/label.directive";
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-almacen-form-modal',
  standalone: true,
  templateUrl: './almacen-form-modal.component.html',
  imports: [FormsModule, ModalComponent, InputFieldComponent, FooterComponent, AutoFocusFirstDirective, LabelDirective]
})
export class AlmacenFormModalComponent {

  @Input({ required: true }) state!: any;
  @Input() submitted = false;

  @Output() save = new EventEmitter<NgForm>();
  @Output() close = new EventEmitter<void>();
  @Output() create = new EventEmitter<void>();

  //CAMBIO PRO: actualizar campo sin mutar directamente
  update(field: string, value: any) {
    this.state.selected = {
      ...this.state.selected,
      [field]: value
    };
  }

  get selectedSafe() {
    return {
      codigo: '',
      descripcion: '',
      direccion: '',
      telefono: '',
      encargado: '',
      ...this.state?.selected
    };
  }
}