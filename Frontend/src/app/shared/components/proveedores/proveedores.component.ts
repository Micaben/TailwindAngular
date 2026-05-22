import { PageBreadcrumbComponent } from '../common/page-breadcrumb/page-breadcrumb.component';
import { CommonModule } from '@angular/common';
import { InputFieldComponent } from '../form/input/input-field.component';
import { Component, Input, Output, EventEmitter, OnInit, } from '@angular/core';
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

interface Formulario {
  id?: number;
  tipo_documento: string,
  ruc: string,
  tipo_persona: string,
  nombres: string,
  apellido_paterno: string,
  apellido_materno: string,
  nombre_comercial: string,
  razon_social: string,
  direccion: string,
  nombre_contacto: string,
  telefono: string,
  pais: string,
  estado: boolean,

}

export interface Option {
  value: string;
  label: string;
}

const EMPTY_FORM: Formulario = {
  id: undefined,
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
};

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

export class ProveedoresComponent implements OnInit {
  selected: Formulario = { ...EMPTY_FORM };
  constructor(public modal: ModalService, private alertService: AlertService, private tablasService: TablasService, private proveedoresService: ProveedoresService) { }
  modo: 'crear' | 'editar' = 'crear';
  formSubmitted = false;
  boxIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>`
  searchTerm: string = '';
  filteredItems: Proveedores[] = [];
  proveedores: Proveedores[] = [];
  @Input() tipopersonaoptions: Option[] = [];
  @Input() tipodocumentooptions: Option[] = [];
  isOpen = false;
  openModal() { this.isOpen = true; }
  closeModal() { this.isOpen = false; }
  currentPage = 1;
  itemsPerPage = 5;

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

  async handleSave(form: any) {
    this.formSubmitted = true;

    if (form.invalid) {
      return;
    }

    const payload = {
      ...this.selected,
      //fechaInicio: this.selected.fechaInicio || null, EJEMPLO PARA VARIAS FECHAS 
      //fechaFin: this.selected.fechaFin || null,
    };

    const isCreate = this.modo === 'crear';
    const request = isCreate
      ? this.proveedoresService.crearProveedor(payload)
      : this.proveedoresService.actualizarProveedor(
        this.selected.id!,
        payload
      );

    request.subscribe({
      next: async (resp: any) => {
        // guardar el ID retornado por el backend
        if (isCreate) {
          this.selected.id = resp.id; // o resp.data.id
          this.modo = 'editar';
        }

        await this.cargarProveedor();
        this.alertService.success(
          isCreate
            ? 'Datos guardados'
            : 'Datos modificados'
        );
        this.formSubmitted = false;
      },

      error: (err) => {
        this.alertService.error(
          err.error?.message || 'Ocurrió un error'
        );
      }
    });
  }

  async ngOnInit(): Promise<void> {
    await Promise.all([
      this.cargarTipopersona(),
      this.cargarTipodocumento(),
      this.cargarProveedor()
    ]);
  }

  async cargarProveedor() {
    try {
      this.proveedores = await this.proveedoresService.obtenerProveedor();
      this.filteredItems = [...this.proveedores];
    } catch (error) {
      this.alertService.error('Error cargando productos');
    }
  }

  mapOptions<T>(data: T[], valueKey: keyof T, labelKey: keyof T): Option[] {
    return data.map(item => ({
      value: String(item[valueKey]),
      label: String(item[labelKey])
    }));
  }

  async cargarTipopersona() {
    const data = await this.tablasService.obtenerTipopersona();
    this.tipopersonaoptions = this.mapOptions(
      data,
      'codigo',
      'descripcion'
    );
  }

  async cargarTipodocumento() {
    const data = await this.tablasService.obtenerTipodocumento();
    this.tipodocumentooptions = this.mapOptions(
      data,
      'codigo',
      'descripcion'
    );
  }

  /*onChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.value = value;
    this.valueChange.emit(value);
  }*/

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
    this.selected = { ...EMPTY_FORM };
    this.isOpen = true;
  }

  async openEditModal(item: Proveedores) {
    this.formSubmitted = false;
    this.modo = 'editar';
    this.selected = {
      id: item.id,
      tipo_documento: item.tipo_documento || '',
      ruc: item.ruc || '',
      tipo_persona: item.tipo_persona || '',
      nombres: item.nombres || '',
      apellido_paterno: item.apellido_paterno || '',
      apellido_materno: item.apellido_materno || '',
      nombre_comercial: item.nombre_comercial || '',
      razon_social: item.razon_social || '',
      direccion: item.direccion || '',
      nombre_contacto: item.nombre_contacto || '',
      telefono: item.telefono || '',
      pais: item.pais || '',
      estado: item.estado ?? true
    };
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


}
