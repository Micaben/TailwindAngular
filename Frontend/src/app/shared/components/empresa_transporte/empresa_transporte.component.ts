import { PageBreadcrumbComponent } from '../common/page-breadcrumb/page-breadcrumb.component';
import { CommonModule } from '@angular/common';
import { InputFieldComponent } from '../form/input/input-field.component';
import { Component, Input, Output, EventEmitter, ElementRef, viewChild, AfterViewInit } from '@angular/core';
import { ButtonComponent } from '../ui/button/button.component';
import { ModalService } from '../../services/modal.service';
import { ModalComponent } from '../ui/modal/modal.component';
import { Empresa_transporteService } from '../../../core/services/empresa_transporte.services';
import { Empresa_transporte } from '../../../core/models/empresa_transporte.model';
import { FormsModule } from '@angular/forms';
import { AutoFocusFirstDirective } from '../../directives/autofocus';
import { AlertService } from '../../../core/services/alert.services';
import { PaginationComponent } from '../../components/pagination/pagination.component';

interface Formulario {
  id?: number;
  ruc: string;
  razon_social: string;
}

interface Option {
  value: string;
  label: string;
}

const EMPTY_FORM: Formulario = {
  id: undefined,
  ruc: '',
  razon_social: '',
};

@Component({
  selector: 'app-empresa_transporte',
  imports: [
    CommonModule,
    ButtonComponent,
    InputFieldComponent,
    ModalComponent,
    PageBreadcrumbComponent,
    PaginationComponent,
    FormsModule,
    AutoFocusFirstDirective,
  ],
  templateUrl: './empresa_transporte.component.html',
  styles: ``
})

export class Empresa_transporteComponent {
  selected: Formulario = { ...EMPTY_FORM };
  modo: 'crear' | 'editar' = 'crear';
  formSubmitted = false;
  constructor(public modal: ModalService, private alertService: AlertService, private empresa_transporteService: Empresa_transporteService) { }
  boxIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>`
  searchTerm: string = '';
  filteredItems: Empresa_transporte[] = [];
  empresa_transporte: Empresa_transporte[] = [];
  isOpen = false;
  openModal() { this.isOpen = true; }
  closeModal() { this.isOpen = false; }
  currentPage = 1;
  itemsPerPage = 5;
  @Input() options: Option[] = [];
  get totalPages(): number {
    return Math.ceil(this.filteredItems.length / this.itemsPerPage);
  }

  get currentItems(): Empresa_transporte[] {
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
      this.filteredItems = [...this.empresa_transporte];
      return;
    }

    this.filteredItems = this.empresa_transporte.filter(item =>
      item.ruc?.toLowerCase().includes(term) ||
      item.razon_social?.toLowerCase().includes(term)
    );
  }

  async cargarEmpresa_transporte() {
    try {
      this.empresa_transporte = await this.empresa_transporteService.obtenerEmpresa_transporte();
      this.filteredItems = [...this.empresa_transporte];
    } catch (error) {
      this.alertService.error('Error cargando productos');
    }
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
      ? this.empresa_transporteService.crearEmpresa_transporte(payload)
      : this.empresa_transporteService.actualizarEmpresa_transporte(
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

        await this.cargarEmpresa_transporte();
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
      this.cargarEmpresa_transporte()
    ]);
  }

  openCreateModal() {
    this.formSubmitted = false;
    this.modo = 'crear';
    this.selected = { ...EMPTY_FORM };
    this.isOpen = true;
  }

  async openEditModal(item: Empresa_transporte) {
    this.formSubmitted = false;
    this.modo = 'editar';
    this.selected = {
      id: item.id,
      ruc: item.ruc || '',
      razon_social: item.razon_social || '',
    };
    this.isOpen = true;
  }
}
