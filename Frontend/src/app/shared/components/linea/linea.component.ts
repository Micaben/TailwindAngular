import { PageBreadcrumbComponent } from '../common/page-breadcrumb/page-breadcrumb.component';
import { CommonModule } from '@angular/common';
import { InputFieldComponent } from '../form/input/input-field.component';
import { Component, Input, Output, EventEmitter, ElementRef, viewChild, AfterViewInit } from '@angular/core';
import { ButtonComponent } from '../ui/button/button.component';
import { ModalService } from '../../services/modal.service';
import { ModalComponent } from '../ui/modal/modal.component';
import { LineaService } from '../../../core/services/linea.service';
import { Linea } from '../../../core/models/linea.model';
import { FormsModule } from '@angular/forms';
import { AutoFocusFirstDirective } from '../../directives/autofocus';
import { AlertService } from '../../../core/services/alert.services';

export interface Option {
  value: string;
  label: string;
}

@Component({
  selector: 'app-linea',
  imports: [
    CommonModule,
    ButtonComponent,
    InputFieldComponent,
    ModalComponent,
    PageBreadcrumbComponent,
    FormsModule,
    AutoFocusFirstDirective,
  ],
  templateUrl: './linea.component.html',
  styles: ``
})

export class LineaComponent {
  selected: any = {
    codigo: '',
    descripcion: '',
    required: 'true'
  };
  modo: 'crear' | 'editar' = 'crear';
  formSubmitted = false;
  constructor(public modal: ModalService, private alertService: AlertService, private lineaService: LineaService) { }
  boxIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>`
  searchTerm: string = '';
  filteredItems: Linea[] = [];
  linea: Linea[] = [];
  isOpen = false;
  openModal() { this.isOpen = true; }
  closeModal() {
    this.isOpen = false; this.selected = {
      codigo: '',
      descripcion: ''
    };
  }
  currentPage = 1;
  itemsPerPage = 5;
  @Input() value: string = '';
  @Output() valueChange = new EventEmitter<string>();
  @Input() options: Option[] = [];
  get totalPages(): number {
    return Math.ceil(this.filteredItems.length / this.itemsPerPage);
  }

  get currentItems(): Linea[] {
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
      this.filteredItems = [...this.linea];
      return;
    }

    this.filteredItems = this.linea.filter(item =>
      item.codigo?.toLowerCase().includes(term) ||
      item.descripcion?.toLowerCase().includes(term)
    );
  }

  async ngOnInit() {
    await this.cargarLinea();
  }

  async cargarLinea() {
    this.linea =
      await this.lineaService.obtenerLinea();
    this.filteredItems = [...this.linea];
  }

  async handleSave(form: any) {
    this.formSubmitted = true;
    if (this.modo === 'crear') {
      if (form.invalid) {
        return;
      }

      this.lineaService.crearLinea(this.selected)
        .subscribe({
          next: async () => {
            this.alertService.success('Datos guardados');
            await this.cargarLinea();
            this.closeModal();
          },

          error: (err) => {
            this.alertService.error(
              err.error?.message || 'Ocurrió un error'
            );
          }
        });
    } else {
      this.lineaService.actualizarLinea(
        this.selected.id,
        this.selected
      ).subscribe({
        next: async () => {
          await this.cargarLinea();
          this.alertService.success('Datos modificados');
          this.closeModal();
        }
      });
    }
  }

  onChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.value = value;
    this.valueChange.emit(value);
  }

  openCreateModal() {
    this.formSubmitted = false;
    this.modo = 'crear';
    this.selected = {
      codigo: '',
      descripcion: ''
    };
    this.isOpen = true;
  }

  openEditModal(item: any) {
    this.modo = 'editar';
    this.selected = { ...item };
    this.isOpen = true;
  }
}
