import { PageBreadcrumbComponent } from '../common/page-breadcrumb/page-breadcrumb.component';
import { CommonModule } from '@angular/common';
import { InputFieldComponent } from '../form/input/input-field.component';
import { Component, Input, Output, EventEmitter, } from '@angular/core';
import { ButtonComponent } from '../ui/button/button.component';
import { ModalService } from '../../services/modal.service';
import { ModalComponent } from '../ui/modal/modal.component';
import { FormsModule } from '@angular/forms';
import { BadgeComponent } from '../ui/badge/badge.component';
import { Clientes } from '../../../core/models/clientes.model';
import { ClientesService } from '../../../core/services/clientes.services';
import { CondicionService } from '../../../core/services/condicion.service';
import { VendedorService } from '../../../core/services/vendedor.service';
import { TablasService } from '../../../core/services/tablas.service';
import { AutoFocusFirstDirective } from '../../../shared/directives/autofocus';
import { AlertService } from '../../../core/services/alert.services';
import { PaginationComponent } from '../../components/pagination/pagination.component';

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
  cargo_contacto: string,
  estado: boolean,
  correo: string,
  condicion_venta: string,
  vendedor: string,
  moneda: string,
  ubigeo: string,
  direccion_entrega: string,
  ag_retencion: boolean,
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
  cargo_contacto: '',
  correo: '',
  condicion_venta: '01',
  vendedor: '01',
  moneda: '01',
  ubigeo: '',
  direccion_entrega: '',
  estado: true,
  ag_retencion: false,
};

@Component({
  selector: 'app-clientes',
  imports: [
    CommonModule,
    ButtonComponent,
    InputFieldComponent,
    BadgeComponent,
    PaginationComponent,
    ModalComponent,
    AutoFocusFirstDirective,
    FormsModule,
    PageBreadcrumbComponent,
  ],
  templateUrl: './clientes.component.html',
  styles: ``
})

export class ClientesComponent {
  selected: Formulario = { ...EMPTY_FORM };
  constructor(public modal: ModalService, private alertService: AlertService, private tablasService: TablasService, private condicionService: CondicionService, private vendedorService: VendedorService, private clientesService: ClientesService) { }
  modo: 'crear' | 'editar' = 'crear';
  formSubmitted = false;
  boxIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>`
  searchTerm: string = '';
  filteredItems: Clientes[] = [];
  clientes: Clientes[] = [];
  isOpen = false;
  search = '';
  openModal() { this.isOpen = true; }
  closeModal() { this.isOpen = false; }
  modalContacto: boolean = false;
  currentPage = 1;
  itemsPerPage = 5;
  @Input() tipopersonaoptions: Option[] = [];
  @Input() tipodocumentooptions: Option[] = [];
  @Input() monedaoptions: Option[] = [];
  @Input() condicionoptions: Option[] = [];
  @Input() vendedoroptions: Option[] = [];
  filteredOptions = [...this.tipopersonaoptions];
  get totalPages(): number {
    return Math.ceil(this.clientes.length / this.itemsPerPage);
  }

  get currentItems(): Clientes[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.clientes.slice(start, start + this.itemsPerPage);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  filtrarOpciones() {
    this.filteredOptions = this.tipopersonaoptions.filter(x =>
      x.label.toLowerCase().includes(this.search.toLowerCase())
    );
  }

  seleccionar(option: any) {
    this.selected.tipo_persona = option.value;
    this.search = option.label;
    this.filteredOptions = [];
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
      ? this.clientesService.crearClientes(payload)
      : this.clientesService.actualizarClientes(
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

        await this.cargarClientes();
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
    ]);
  }

  async cargarClientes() {
    try {
      this.clientes = await this.clientesService.obtenerClientes();
      this.filteredItems = [...this.clientes];
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

  openCreateModal() {
    this.formSubmitted = false;
    this.modo = 'crear';
    this.selected = { ...EMPTY_FORM };
    this.isOpen = true;
  }

  async openEditModal(item: Clientes) {
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
      cargo_contacto: item.cargo_contacto || '',
      estado: item.estado ?? true,
      correo: item.correo || '',
      ubigeo: item.ubigeo || '',
      condicion_venta: item.condicion_venta || '',
      vendedor: item.vendedor || '',
      moneda: item.moneda || '',
      direccion_entrega: item.direccion_entrega || '',
      ag_retencion: item.ag_retencion ?? false
    };
    this.isOpen = true;
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

  abrirModalContacto() {
    this.modalContacto = true;
  }

  cerrarModalContacto() {
    this.modalContacto = false;
  }
}
