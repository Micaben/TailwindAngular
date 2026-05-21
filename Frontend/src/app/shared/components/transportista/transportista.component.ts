import { PageBreadcrumbComponent } from '../common/page-breadcrumb/page-breadcrumb.component';
import { CommonModule } from '@angular/common';
import { InputFieldComponent } from '../form/input/input-field.component';
import { Component, Input, Output, EventEmitter, OnInit, } from '@angular/core';
import { ButtonComponent } from '../ui/button/button.component';
import { ModalService } from '../../services/modal.service';
import { ModalComponent } from '../ui/modal/modal.component';
import { FormsModule } from '@angular/forms';
import { BadgeComponent } from '../ui/badge/badge.component';
import { Transportista } from '../../../core/models/transportista.model';
import { TransportistaService } from '../../../core/services/transportista.service';
import { TablasService } from '../../../core/services/tablas.service';
import { AutoFocusFirstDirective } from '../../directives/autofocus';
import { Empresa_transporteService } from '../../../core/services/empresa_transporte.services';
import { AlertService } from '../../../core/services/alert.services';

interface Formulario {
  id?: number;
  empresa_transporte: string,
  nombres: string,
  dni: string,
  licencia: string,
  unidad: string,
  placa: string,
  apellido_paterno: string,
  apellido_materno: string,
  tipo_documento: string,
  estado: boolean,

}

export interface Option {
  value: string;
  label: string;
}

const EMPTY_FORM: Formulario = {
  id: undefined,
  empresa_transporte: '',
  nombres: '',
  dni: '',
  licencia: '',
  unidad: '',
  placa: '',
  apellido_paterno: '',
  apellido_materno: '',
  tipo_documento: '',
  estado: true,
};

@Component({
  selector: 'app-transportista',
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
  templateUrl: './transportista.component.html',
  styles: ``
})

export class TransportistaComponent implements OnInit {
  selected: Formulario = { ...EMPTY_FORM };
  filteredItems: Transportista[] = [];
  transportista: Transportista[] = [];
  modo: 'crear' | 'editar' = 'crear';
  empresa_transporteoptions: Option[] = [];
  @Input() tipopersonaoptions: Option[] = [];
  @Input() tipodocumentooptions: Option[] = [];
  formSubmitted = false;
  isOpen = false;
  currentPage = 1;
  itemsPerPage = 5;
  constructor(public modal: ModalService, private alertService: AlertService, private empresa_transporteService: Empresa_transporteService, private tablasService: TablasService, private transportistaService: TransportistaService) { }
  boxIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>`
  searchTerm: string = '';  
  openModal() { this.isOpen = true; }
  closeModal() { this.isOpen = false; }


  get totalPages(): number {
    return Math.ceil(this.filteredItems.length / this.itemsPerPage);
  }

  get currentItems(): Transportista[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredItems.slice(start, start + this.itemsPerPage);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  filterTable() {

  const term =
    this.searchTerm
      .trim()
      .toLowerCase();

  if (!term) {
    this.filteredItems = [...this.transportista];
    return;
  }

  this.filteredItems =
    this.transportista.filter(item =>

      // NOMBRE COMPLETO
      `${item.nombres}
       ${item.apellido_paterno}
       ${item.apellido_materno}`
        .toLowerCase()
        .includes(term)

      ||

      item.dni
        ?.toLowerCase()
        .includes(term)

      ||

      item.empresa_transporte
        ?.toLowerCase()
        .includes(term)
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
    console.log(payload);
    const request =
      this.modo === 'crear'
        ? this.transportistaService.crearTransportista(payload)
        : this.transportistaService.actualizarTransportista(
          this.selected.id!,
          payload
        );

    request.subscribe({
      next: async () => {
        await this.cargarTransportista();

        this.alertService.success(
          this.modo === 'crear'
            ? 'Datos guardados'
            : 'Datos modificados'
        );
        this.selected = { ...EMPTY_FORM };
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
      this.cargarTipodocumento(),
      this.cargarTransportista(),
      this.cargarEmpresa_transporte()
    ]);
  }

  async cargarTransportista() {
    try {
      this.transportista = await this.transportistaService.obtenerTransportista();
      this.filteredItems = [...this.transportista];
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

  async cargarTipodocumento() {
    const data = await this.tablasService.obtenerTipodocumento();
    this.tipodocumentooptions = this.mapOptions(
      data,
      'codigo',
      'descripcion'
    );
  }

  async cargarEmpresa_transporte() {
    const data = await this.empresa_transporteService.obtenerEmpresa_transporte();
    this.empresa_transporteoptions = this.mapOptions(
      data,
      'ruc',
      'razon_social'
    );
  }
  /*onChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.value = value;
    this.valueChange.emit(value);
  }*/

  onProveedorChange(ruc: string) {
    this.selected.empresa_transporte = ruc;
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
    this.selected = { ...EMPTY_FORM };
    this.isOpen = true;
  }

  async openEditModal(item: Transportista) {
    this.formSubmitted = false;
    this.modo = 'editar';
    this.selected = {
      id: item.id,
      tipo_documento: item.tipo_documento || '',
      dni: item.dni || '',
      nombres: item.nombres || '',
      apellido_paterno: item.apellido_paterno || '',
      apellido_materno: item.apellido_materno || '',
      empresa_transporte: item.empresa_transporte || '',
      unidad: item.unidad || '',
      placa: item.placa || '',
      licencia: item.licencia || '',
      estado: item.estado ?? true
    };
    this.isOpen = true;
  }

}
