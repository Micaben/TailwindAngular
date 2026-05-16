import { PageBreadcrumbComponent } from '../common/page-breadcrumb/page-breadcrumb.component';
import { CommonModule } from '@angular/common';
import { InputFieldComponent } from '../form/input/input-field.component';
import { Component, Input, Output, EventEmitter, } from '@angular/core';
import { ButtonComponent } from '../ui/button/button.component';
import { ModalService } from '../../services/modal.service';
import { ModalComponent } from '../ui/modal/modal.component';
import { FormsModule } from '@angular/forms';
import { BadgeComponent } from '../ui/badge/badge.component';
import { Proveedores } from '../../../core/models/proveedores.model';
import { ProveedoresService } from '../../../core/services/proveedores.service';
import { TablasService } from '../../../core/services/tablas.service';

export interface Option {
  value: string;
  label: string;
}

@Component({
  selector: 'app-proveedores',
  imports: [
    CommonModule,
    ButtonComponent,
    InputFieldComponent,
    BadgeComponent,
    ModalComponent,
    FormsModule,
    PageBreadcrumbComponent,
  ],
  templateUrl: './proveedores.component.html',
  styles: ``
})

export class ProveedoresComponent {
  selected: any = {
    ruc: '',
    razonocial: '',
    direccion: '',
    telefono: '',
    tipopersona: '',
    tipodocumento: '',
    pais: '',
    correo: ''
  };
  constructor(public modal: ModalService, private tablasService: TablasService, private proveedoresService: ProveedoresService) { }
  modo: 'crear' | 'editar' = 'crear';
  formSubmitted = false;
  boxIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>`
  searchTerm: string = '';
  filteredItems: Proveedores[] = [];
  proveedores: Proveedores[] = [];
  today: string = new Date().toISOString().split('T')[0];
  isOpen = false;
  openModal() { this.isOpen = true; }
  closeModal() { this.isOpen = false; }
  currentPage = 1;
  itemsPerPage = 5;
  @Input() value: string = '';
  @Output() valueChange = new EventEmitter<string>();
  @Input() tipopersonaoptions: Option[] = [];
  @Input() tipodocumentooptions: Option[] = [];
  @Input() type: string = 'text';
  expirationDate: string = '';
  @Input() placeholder?: string;
  get totalPages(): number {
    return Math.ceil(this.proveedores.length / this.itemsPerPage);
  }

  get currentItems(): Proveedores[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.proveedores.slice(start, start + this.itemsPerPage);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  handleSave() {
    console.log('Saving changes...');
    this.modal.closeModal();
  }

  onChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.value = value;
    this.valueChange.emit(value);
  }

  getBadgeColor(estado: any): 'success' | 'warning' | 'error' {
    const value = String(estado).toLowerCase();
    if (value === 'true' || value === 'activo' || value === 'active') {
      return 'success';
    }
    if (value === 'pendiente' || value === 'pending') {
      return 'warning';
    }
    return 'error';
  }

  async ngOnInit() {
    this.proveedores = await this.proveedoresService.obtenerProveedor();
    await this.cargarTipodocumento();
    await this.cargarTipopersona();
    console.log(this.cargarTipopersona);
    const today = new Date();

    today.setDate(today.getDate() + 30);

    this.expirationDate = today.toISOString().split('T')[0];
  }

  openCreateModal() {
    this.formSubmitted = false;
    this.modo = 'crear';
    this.selected = {
      codigo: '',
      descripcion: '',
      linea: ''
    };
    this.value = '';
    this.isOpen = true;
  }

  openEditModal(item: any) {
    this.modo = 'editar';
    this.selected = { ...item };
    this.value = String(item.codigolinea);
    this.selected.linea = String(item.codigolinea);
    this.isOpen = true;
  }

  cambiarEstado(item: any) {
    this.proveedoresService.toggleEstado(item.id).subscribe({
      next: (res: any) => {
        item.estado = res.estado; // actualiza UI sin recargar
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  async cargarTipopersona() {
    const data = await this.tablasService.obtenerTipopersona();
    this.tipopersonaoptions = data.map((item: any) => ({
      value: item.codigo,
      label: item.descripcion
    }));
  }

  async cargarTipodocumento() {
    const data = await this.tablasService.obtenerTipodocumento();
    this.tipodocumentooptions = data.map((item: any) => ({
      value: item.codigo,
      label: item.descripcion
    }));
  }
}
