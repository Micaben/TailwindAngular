import { Component, OnInit } from '@angular/core';
import { DropdownComponent } from '../../ui/dropdown/dropdown.component';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { DropdownItemTwoComponent } from '../../ui/dropdown/dropdown-item/dropdown-item.component-two';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.services';


@Component({
  selector: 'app-user-dropdown',
  templateUrl: './user-dropdown.component.html',
  imports: [
    CommonModule,
    RouterModule,
    DropdownComponent,
    DropdownItemTwoComponent
  ]
})

export class UserDropdownComponent implements OnInit {

  isOpen = false;
  user: {
    nombre: string;
    apellido: string;
    email: string;
    telefono: string;
    direccion: string;
  } | null = null;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.user = this.authService.getUser();

  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  closeDropdown() {
    this.isOpen = false;
  }

  logout() {
    // eliminar token o datos de sesión
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    // cerrar dropdown
    this.closeDropdown();

    // redirigir a login
    this.router.navigate(['/signin']);
  }
}