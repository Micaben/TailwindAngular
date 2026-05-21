import { PageBreadcrumbComponent } from '../common/page-breadcrumb/page-breadcrumb.component';
import { CommonModule } from '@angular/common';
import { InputFieldComponent } from '../form/input/input-field.component';
import { Component, Input, Output, EventEmitter, ElementRef, viewChild, AfterViewInit } from '@angular/core';
import { ButtonComponent } from '../ui/button/button.component';
import { ModalService } from '../../services/modal.service';
import { ModalComponent } from '../ui/modal/modal.component';
import { AlmacenesService } from '../../../core/services/almacenes.services';
import { Almacenes } from '../../../core/models/almacenes.model';
import { FormsModule } from '@angular/forms';
import { AutoFocusFirstDirective } from '../../directives/autofocus';
import { AlertService } from '../../../core/services/alert.services';

interface Formulario {
  id?: number;
  codigo: string;
  descripcion: string;
  direccion: string;
  telefono: string;
  encargado: string;
}

interface Option {
  value: string;
  label: string;
}

const EMPTY_FORM: Formulario = {
  id: undefined,
  codigo: '',
  descripcion: '',
  direccion: '',
  telefono:'',
  encargado: '',
};

@Component({
  selector: 'app-almacenes',
  imports: [
    CommonModule,
    ButtonComponent,
    InputFieldComponent,
    ModalComponent,
    PageBreadcrumbComponent,
    FormsModule,
    AutoFocusFirstDirective,
  ],
  templateUrl: './almacenes.component.html',
  styles: ``
})

export class AlmacenesComponent {
  selected: Formulario = { ...EMPTY_FORM };
  modo: 'crear' | 'editar' = 'crear';
  formSubmitted = false;
  constructor(public modal: ModalService, private alertService: AlertService, private almacenesService: AlmacenesService) { }
  boxIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>`
  searchTerm: string = '';
  filteredItems: Almacenes[] = [];
  almacenes: Almacenes[] = [];
  isOpen = false;
  openModal() { this.isOpen = true; }
  closeModal() { this.isOpen = false; }
  currentPage = 1;
  itemsPerPage = 5;
  @Input() options: Option[] = [];
  get totalPages(): number {
    return Math.ceil(this.filteredItems.length / this.itemsPerPage);
  }

  get currentItems(): Almacenes[] {
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
      this.filteredItems = [...this.almacenes];
      return;
    }

    this.filteredItems = this.almacenes.filter(item =>
      item.codigo?.toLowerCase().includes(term) ||
      item.descripcion?.toLowerCase().includes(term)
    );
  }

  /*async cargarAlmacenes() {
    this.almacenes =
      await this.almacenesService.obtenerLinea();
    this.filteredItems = [...this.almacenes];
  }*/

  async cargarAlmacenes() {
    try {
      this.almacenes = await this.almacenesService.obtenerAlmacenes();
      this.filteredItems = [...this.almacenes];
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
        ? this.almacenesService.crearAlmacenes(payload)
        : this.almacenesService.actualizarAlmacenes(
          this.selected.id!,
          payload
        );

    request.subscribe({
      next: async () => {
        await this.cargarAlmacenes();

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
      this.cargarAlmacenes()
    ]);
  }

  openCreateModal() {
    this.formSubmitted = false;
    this.modo = 'crear';
    this.selected = { ...EMPTY_FORM };
    this.isOpen = true;
  }

  async openEditModal(item: Almacenes) {
    this.formSubmitted = false;
    this.modo = 'editar';
    this.selected = {
      id: item.id,
      codigo: item.codigo || '',
      descripcion: item.descripcion || '',
      direccion: item.direccion || '',
      telefono: item.telefono || '',
      encargado: item.encargado || '',
    };
    this.isOpen = true;
  }
}
