import { PageBreadcrumbComponent } from '../common/page-breadcrumb/page-breadcrumb.component';
import { CommonModule } from '@angular/common';
import { InputFieldComponent } from '../form/input/input-field.component';
import { Component, Input, Output, EventEmitter, ElementRef, viewChild, AfterViewInit } from '@angular/core';
import { ButtonComponent } from '../ui/button/button.component';
import { ModalService } from '../../services/modal.service';
import { ModalComponent } from '../ui/modal/modal.component';
import { ConceptoService } from '../../../core/services/concepto.services';
import { Concepto } from '../../../core/models/concepto.model';
import { FormsModule } from '@angular/forms';
import { AutoFocusFirstDirective } from '../../directives/autofocus';
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
  selector: 'app-concepto',
  imports: [
    CommonModule,
    ButtonComponent,
    InputFieldComponent,
    ModalComponent,
    PageBreadcrumbComponent,
    FormsModule,
    AutoFocusFirstDirective,
  ],
  templateUrl: './concepto.component.html',
  styles: ``
})

export class ConceptoComponent {
  selected: Formulario = { ...EMPTY_FORM };
  modo: 'crear' | 'editar' = 'crear';
  formSubmitted = false;
  constructor(public modal: ModalService, private alertService: AlertService, private conceptoService: ConceptoService) { }
  boxIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>`
  searchTerm: string = '';
  filteredItems: Concepto[] = [];
  concepto: Concepto[] = [];
  isOpen = false;
  openModal() { this.isOpen = true; }
  closeModal() { this.isOpen = false; }
  currentPage = 1;
  itemsPerPage = 5;
  @Input() options: Option[] = [];
  get totalPages(): number {
    return Math.ceil(this.filteredItems.length / this.itemsPerPage);
  }

  get currentItems(): Concepto[] {
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
      this.filteredItems = [...this.concepto];
      return;
    }

    this.filteredItems = this.concepto.filter(item =>
      item.codigo?.toLowerCase().includes(term) ||
      item.descripcion?.toLowerCase().includes(term)
    );
  }

  /*async cargarConcepto() {
    this.concepto =
      await this.conceptoService.obtenerLinea();
    this.filteredItems = [...this.concepto];
  }*/

  async cargarConcepto() {
    try {
      this.concepto = await this.conceptoService.obtenerConcepto();
      this.filteredItems = [...this.concepto];
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
        ? this.conceptoService.crearConcepto(payload)
        : this.conceptoService.actualizarConcepto(
          this.selected.id!,
          payload
        );

    request.subscribe({
      next: async () => {
        await this.cargarConcepto();

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
      this.cargarConcepto()
    ]);
  }

  openCreateModal() {
    this.formSubmitted = false;
    this.modo = 'crear';
    this.selected = { ...EMPTY_FORM };
    this.isOpen = true;
  }

  async openEditModal(item: Concepto) {
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
