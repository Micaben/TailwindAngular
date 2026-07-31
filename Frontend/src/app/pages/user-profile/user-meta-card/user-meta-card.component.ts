import { Component, Input, Output, EventEmitter } from '@angular/core';
import { InputFieldComponent } from '../../../shared/components/form/input/input-field.component';
import { ModalService } from '../../../shared/services/modal.service';
import { User } from '../../../core/models/user.model';
import { ModalComponent } from '../../../shared/components/ui/modal/modal.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.services';

@Component({
  selector: 'app-user-meta-card',
  imports: [
    ModalComponent,
    FormsModule,
    InputFieldComponent,
  ],
  templateUrl: './user-meta-card.component.html',
  styles: ``
})
export class UserMetaCardComponent {
  selected: any = {
    nombre: '',
    apellido: '',
    direccion: '',
    telefono: '',
    email: '',
    bio:''
  };
  constructor(public modal: ModalService, private authService: AuthService) { }
  user: User[] = [];
  isOpen = false;
  @Input() value: string = '';
  @Output() valueChange = new EventEmitter<string>();
  openModal() { this.isOpen = true; }
  closeModal() { this.isOpen = false; }


  ngOnInit() {
    console.log('USER DESDE LOCALSTORAGE:', this.authService.getUser());
    this.selected = this.authService.getUser();
  }

  handleSave() {
    // Handle save logic here
    console.log('Saving changes...');
    this.modal.closeModal();
  }

  openEditModal(item: any) {
    //this.modo = 'editar';
    this.selected = { ...item };
    this.isOpen = true;
  }
}
