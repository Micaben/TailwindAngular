import { PageBreadcrumbComponent } from '../common/page-breadcrumb/page-breadcrumb.component';
import { CommonModule } from '@angular/common';
import { InputFieldComponent } from '../form/input/input-field.component';
import { Component, Input, Output, EventEmitter, ElementRef, viewChild, AfterViewInit } from '@angular/core';
import { ButtonComponent } from '../ui/button/button.component';
import { ModalService } from '../../services/modal.service';
import { ModalComponent } from '../ui/modal/modal.component';
import { CondicionService } from '../../../core/services/condicion.service';
import { Condicion } from '../../../core/models/condicion.model';
import { FormsModule } from '@angular/forms';
import { AutoFocusFirstDirective } from '../../directives/autofocus';
import { AlertService } from '../../../core/services/alert.services';

interface Formulario {
  id?: number;
  codigo: string;
  descripcion: string;
  plazo: number;
}

interface Option {
  value: string;
  label: string;
}

const EMPTY_FORM: Formulario = {
  id: undefined,
  codigo: '',
  descripcion: '',
  plazo: 0,
};

@Component({
  selector: 'app-condicion',
  imports: [
    CommonModule,
    ButtonComponent,
    InputFieldComponent,
    ModalComponent,
    PageBreadcrumbComponent,
    FormsModule,
    AutoFocusFirstDirective,
  ],
  templateUrl: './condicion.component.html',
  styles: ``
})

export class CondicionComponent {
  selected: Formulario = { ...EMPTY_FORM };
  modo: 'crear' | 'editar' = 'crear';
  formSubmitted = false;
  constructor(public modal: ModalService, private alertService: AlertService, private condicionService: CondicionService) { }
  boxIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>`
  searchTerm: string = '';
  filteredItems: Condicion[] = [];
  condicion: Condicion[] = [];
  isOpen = false;
  openModal() { this.isOpen = true; }
  closeModal() { this.isOpen = false; }
  currentPage = 1;
  itemsPerPage = 5;
  @Input() options: Option[] = [];
  get totalPages(): number {
    return Math.ceil(this.filteredItems.length / this.itemsPerPage);
  }

  get currentItems(): Condicion[] {
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
      this.filteredItems = [...this.condicion];
      return;
    }

    this.filteredItems = this.condicion.filter(item =>
      item.codigo?.toLowerCase().includes(term) ||
      item.descripcion?.toLowerCase().includes(term)
    );
  }

  /*async cargarCondicion() {
    this.condicion =
      await this.condicionService.obtenerLinea();
    this.filteredItems = [...this.condicion];
  }*/

  async cargarCondicion() {
    try {
      this.condicion = await this.condicionService.obtenerCondicion();
      this.filteredItems = [...this.condicion];
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
        ? this.condicionService.crearCondicion(payload)
        : this.condicionService.actualizarCondicion(
          this.selected.id!,
          payload
        );

    request.subscribe({
      next: async () => {
        await this.cargarCondicion();

        this.alertService.success(
          this.modo === 'crear'
            ? 'Datos guardados'
            : 'Datos modificados'
        );

        this.closeModal();
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
      this.cargarCondicion()
    ]);
  }

  openCreateModal() {
    this.formSubmitted = false;
    this.modo = 'crear';
    this.selected = { ...EMPTY_FORM };
    this.isOpen = true;
  }

  async openEditModal(item: Condicion) {
    this.formSubmitted = false;
    this.modo = 'editar';
    this.selected = {
      id: item.id,
      codigo: item.codigo || '',
      descripcion: item.descripcion || '',
      plazo: item.plazo ?? 0,
    };
    this.isOpen = true;
  }
}
