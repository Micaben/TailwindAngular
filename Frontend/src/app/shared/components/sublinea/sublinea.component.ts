import { PageBreadcrumbComponent } from '../common/page-breadcrumb/page-breadcrumb.component';
import { CommonModule } from '@angular/common';
import { InputFieldComponent } from '../form/input/input-field.component';
import { Component, Input, Output, OnInit, EventEmitter, ElementRef, viewChild, AfterViewInit } from '@angular/core';
import { ButtonComponent } from '../ui/button/button.component';
import { ModalService } from '../../services/modal.service';
import { ModalComponent } from '../ui/modal/modal.component';
import { SublineaService } from '../../../core/services/sublinea.service';
import { Sublinea } from '../../../core/models/sublinea.model';
import { FormsModule } from '@angular/forms';
import { AutoFocusFirstDirective } from '../../../shared/directives/autofocus';
import { AlertService } from '../../../core/services/alert.services';
import { LineaService } from '../../../core/services/linea.service';
import { ErrorHandlerService } from '../../../core/services/error-handler.service';

interface SublineaForm {
  id?: number;
  codigo: string;
  descripcion: string;
  linea: string;
}

export interface Option {
  value: string;
  label: string;
}

const EMPTY_FORM: SublineaForm = {
  id: undefined,
  codigo: '',
  descripcion: '',
  linea: '',
}

@Component({
  selector: 'app-sublinea',
  imports: [
    CommonModule,
    ButtonComponent,
    InputFieldComponent,
    ModalComponent,
    PageBreadcrumbComponent,
    FormsModule,
    AutoFocusFirstDirective,
  ],
  templateUrl: './sublinea.component.html',
  styles: ``
})

export class SublineaComponent implements OnInit {
  selected: SublineaForm = { ...EMPTY_FORM };
  filteredItems: Sublinea[] = [];
  sublinea: Sublinea[] = [];
  options: Option[] = [];
  modo: 'crear' | 'editar' = 'crear';
  formSubmitted = false;
  isOpen = false;
  currentPage = 1;
  itemsPerPage = 5;
  constructor(public modal: ModalService, private alertService: AlertService, private errorHandler: ErrorHandlerService, private lineaService: LineaService, private sublineaService: SublineaService) { }
  boxIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>`
  searchTerm: string = '';
  openModal() { this.isOpen = true; }
  closeModal() { this.isOpen = false; }

  get totalPages(): number {
    return Math.ceil(this.filteredItems.length / this.itemsPerPage);
  }

  get currentItems(): Sublinea[] {
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
      this.filteredItems = [...this.sublinea];
      return;
    }

    this.filteredItems = this.sublinea.filter(item =>
      item.codigo?.toLowerCase().includes(term) ||
      item.descripcion?.toLowerCase().includes(term)
    );
  }

  async ngOnInit(): Promise<void> {
    await Promise.all([
      this.cargarSublinea(),
      this.cargarLinea(),
    ]);
  }

  async cargarSublinea() {
    try {
      this.sublinea = await this.sublineaService.obtenerSublinea();
      this.filteredItems = [...this.sublinea];
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
        ? this.sublineaService.crearSublinea(payload)
        : this.sublineaService.actualizarSublinea(
          this.selected.id!,
          payload
        );

    request.subscribe({
      next: async () => {
        await this.cargarSublinea();

        this.alertService.success(
          this.modo === 'crear'
            ? 'Datos guardados'
            : 'Datos modificados'
        );
        this.selected = { ...EMPTY_FORM };
        this.formSubmitted = false;
      },

      error: (err) => {
        console.log('err.error:', err.error);

        const message =
          typeof err.error === 'string'
            ? err.error
            : err.error?.message;

        this.alertService.error(message || 'Error');
      }
    });
  }

  openCreateModal() {
    this.formSubmitted = false;
    this.modo = 'crear';
    this.selected = { ...EMPTY_FORM };
    this.isOpen = true;
  }

  async openEditModal(item: Sublinea) {
    this.formSubmitted = false;
    this.modo = 'editar';

    this.selected = {
      id: item.id,
      codigo: item.codigo || '',
      descripcion: item.descripcion || '',
      linea: item.codigolinea || '',
    };
    console.log(item.codigolinea)
    this.isOpen = true;
  }

  mapOptions<T>(data: T[], valueKey: keyof T, labelKey: keyof T): Option[] {
    return data.map(item => ({
      value: String(item[valueKey]),
      label: String(item[labelKey])
    }));
  }

  async cargarLinea() {
    const data = await this.lineaService.obtenerLinea();
    this.options = this.mapOptions(
      data,
      'codigo',
      'descripcion'
    );
  }
}
