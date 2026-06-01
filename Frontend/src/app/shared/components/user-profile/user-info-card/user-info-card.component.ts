import { Component } from '@angular/core';
import { ModalService } from '../../../services/modal.service';
import { ModalComponent } from '../../ui/modal/modal.component';
import { User } from '../../../../core/models/user.model';
import { AuthService } from '../../../../core/services/auth.services';

@Component({
  selector: 'app-user-info-card',
  imports: [
    ModalComponent
  ],
  templateUrl: './user-info-card.component.html',
  styles: ``
})
export class UserInfoCardComponent {

  constructor(public modal: ModalService, private authService: AuthService) { }

  isOpen = false;
  openModal() { this.isOpen = true; }
  closeModal() { this.isOpen = false; }

  user: User = {
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    direccion: '',
    bio: 'Team Manager'
  };

  ngOnInit() {
    console.log('USER DESDE LOCALSTORAGE:', this.authService.getUser());

    this.user = this.authService.getUser();
  }

  handleSave() {
    // Handle save logic here
    console.log('Saving changes...');
    this.modal.closeModal();
  }
}
