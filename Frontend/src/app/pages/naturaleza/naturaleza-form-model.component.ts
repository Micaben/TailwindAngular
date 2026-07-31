import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { ModalComponent } from '../../shared/components/ui/modal/modal.component';
import { AutoFocusFirstDirective } from '../../shared/directives/autofocus';
import { InputFieldComponent } from '../../shared/components/form/input/input-field.component';
import { LabelDirective } from "../../shared/directives/label.directive";
import { FooterComponent } from '../../shared/components/footer/footer.component';

@Component({
  selector: 'app-naturaleza-form-model',
  standalone: true,
  templateUrl: './naturaleza-form-model.component.html',
  imports: [FormsModule, ModalComponent, InputFieldComponent, FooterComponent, AutoFocusFirstDirective, LabelDirective]
})
export class NaturalezaFormModelComponent {

  @Input({ required: true }) state!: any;
  @Input() submitted = false;

  @Output() save = new EventEmitter<NgForm>();
  @Output() close = new EventEmitter<void>();
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
      codigo: '',
      descripcion: '',
      ...this.state?.selected
    };
  }
}