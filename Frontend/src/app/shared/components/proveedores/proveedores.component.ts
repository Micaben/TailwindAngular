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
import { AutoFocusFirstDirective } from '../../../shared/directives/autofocus';
import { AlertService } from '../../../core/services/alert.services';

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
    AutoFocusFirstDirective,
    FormsModule,
    PageBreadcrumbComponent,
  ],
  templateUrl: './proveedores.component.html',
  styles: ``
})

export class ProveedoresComponent {
  selected: any = {
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
    required: 'true'
  };
  constructor(public modal: ModalService, private alertService: AlertService, private tablasService: TablasService, private proveedoresService: ProveedoresService) { }
  modo: 'crear' | 'editar' = 'crear';
  formSubmitted = false;
  boxIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>`
  searchTerm: string = '';
  filteredItems: Proveedores[] = [];
  proveedores: Proveedores[] = [];
  isOpen = false;
  openModal() { this.isOpen = true; }
  closeModal() { this.isOpen = false; }
  currentPage = 1;
  itemsPerPage = 5;
  @Input() value: string = '';
  @Output() valueChange = new EventEmitter<string>();
  @Input() tipopersonaoptions: Option[] = [];
  @Input() tipodocumentooptions: Option[] = [];
  get totalPages(): number {
    return Math.ceil(this.filteredItems.length / this.itemsPerPage);
  }

  get currentItems(): Proveedores[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredItems.slice(start, start + this.itemsPerPage);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  filterTable() {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) {
      this.filteredItems = [...this.proveedores];
      return;
    }

    this.filteredItems = this.proveedores.filter(item =>
      item.ruc?.toLowerCase().includes(term) ||
      item.razon_social?.toLowerCase().includes(term)
    );
  }

  async ngOnInit() {
    await this.cargarProveedor();
    await this.cargarTipodocumento();
    await this.cargarTipopersona();
    const today = new Date();

    today.setDate(today.getDate() + 30);
  }

  async cargarProveedor() {
    this.proveedores = await this.proveedoresService.obtenerProveedor();
    this.filteredItems = [...this.proveedores];
  }

  async handleSave(form: any) {
    this.formSubmitted = true;
    if (this.modo === 'crear') {
      if (form.invalid) {
        return;
      }
      this.proveedoresService.crearProveedor(this.selected)
        .subscribe({
          next: async () => {
            await this.cargarProveedor();
            this.alertService.success('Datos guardados');

          },
          error: (err) => {
            this.alertService.error(
              err.error?.message || 'Ocurrió un error'
            );
          }
        });
    } else {
      this.proveedoresService.actualizarProveedor(
        this.selected.id,
        this.selected
      ).subscribe({
        next: async () => {
          this.alertService.success('Datos modificados');
          await this.cargarProveedor();

        }
      });
    }
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

  openCreateModal() {
    this.formSubmitted = false;
    this.modo = 'crear';
    this.selected = {
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
      estado: true
    };
    this.isOpen = true;
  }

  openEditModal(item: any) {
    this.modo = 'editar';
    this.selected = { ...item };
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
