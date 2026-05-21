import { PageBreadcrumbComponent } from '../common/page-breadcrumb/page-breadcrumb.component';
import { CommonModule } from '@angular/common';
import { InputFieldComponent } from '../form/input/input-field.component';
import { Component, Input, Output, EventEmitter, ElementRef, viewChild, AfterViewInit } from '@angular/core';
import { ButtonComponent } from '../ui/button/button.component';
import { ModalService } from '../../services/modal.service';
import { ModalComponent } from '../ui/modal/modal.component';
import { UnidadMedidaService } from '../../../core/services/unidadmedida.service';
import { UnidadMedida } from '../../../core/models/unidadmedida.model';
import { FormsModule } from '@angular/forms';
import { AutoFocusFirstDirective } from '../../../shared/directives/autofocus';
import { AlertService } from '../../../core/services/alert.services';

interface Formulario {
  id?: number;
  codigo: string;
  descripcion: string;
}

interface Option {
  value: string;
  label: string;
}

const EMPTY_FORM: Formulario = {
  id: undefined,
  codigo: '',
  descripcion: '',
};

@Component({
  selector: 'app-unidadmedida',
  imports: [
    CommonModule,
    ButtonComponent,
    InputFieldComponent,
    ModalComponent,
    PageBreadcrumbComponent,
    FormsModule,
    AutoFocusFirstDirective,
  ],
  templateUrl: './unidadmedida.component.html',
  styles: ``
})

export class UnidadMedidaComponent {
  selected: Formulario = { ...EMPTY_FORM };
  modo: 'crear' | 'editar' = 'crear';
  formSubmitted = false;
  constructor(public modal: ModalService, private alertService: AlertService, private unidadmedidaService: UnidadMedidaService) { }
  boxIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>`
  searchTerm: string = '';
  filteredItems: UnidadMedida[] = [];
  unidadmedida: UnidadMedida[] = [];
  isOpen = false;
  openModal() { this.isOpen = true; }
  closeModal() { this.isOpen = false; }
  currentPage = 1;
  itemsPerPage = 5;
  @Input() options: Option[] = [];
  get totalPages(): number {
    return Math.ceil(this.filteredItems.length / this.itemsPerPage);
  }

  get currentItems(): UnidadMedida[] {
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
      this.filteredItems = [...this.unidadmedida];
      return;
    }

    this.filteredItems = this.unidadmedida.filter(item =>
      item.codigo?.toLowerCase().includes(term) ||
      item.descripcion?.toLowerCase().includes(term)
    );
  }

  async cargarUnidadMedida() {
    try {
      this.unidadmedida = await this.unidadmedidaService.obtenerUnidadMedida();
      this.filteredItems = [...this.unidadmedida];
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
    console.log(payload);
    const request =
      this.modo === 'crear'
        ? this.unidadmedidaService.crearUnidadMedida(payload)
        : this.unidadmedidaService.actualizarUnidadMedida(
          this.selected.id!,
          payload
        );

    request.subscribe({
      next: async () => {
        await this.cargarUnidadMedida();

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
      this.cargarUnidadMedida()
    ]);
  }  

  openCreateModal() {
      this.formSubmitted = false;
      this.modo = 'crear';
      this.selected = { ...EMPTY_FORM };
      this.isOpen = true;
    }
  
    async openEditModal(item: UnidadMedida) {
      this.formSubmitted = false;
      this.modo = 'editar';
      this.selected = {
        id: item.id,
        codigo: item.codigo || '',
        descripcion: item.descripcion || '',
      };
      this.isOpen = true;
    }
}
