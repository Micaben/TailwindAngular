import { PageBreadcrumbComponent } from '../common/page-breadcrumb/page-breadcrumb.component';
import { CommonModule } from '@angular/common';
import { InputFieldComponent } from '../form/input/input-field.component';
import { Component, Input, Output, EventEmitter, ElementRef, viewChild, AfterViewInit } from '@angular/core';
import { ButtonComponent } from '../ui/button/button.component';
import { ModalService } from '../../services/modal.service';
import { ModalComponent } from '../ui/modal/modal.component';
import { SublineaService } from '../../../core/services/sublinea.service';
import { Sublinea } from '../../../core/models/sublinea.model';
import { FormsModule } from '@angular/forms';
import { AutoFocusFirstDirective } from '../../../shared/directives/autofocus';
import { AlertService } from '../../../core/services/alert.services';
import { LineaService } from '../../../core/services/linea.service';

export interface Option {
  value: string;
  label: string;
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

export class SublineaComponent {
  selected: any = {
    codigo: '',
    descripcion: '',
    linea: '',
    required: 'true'
  };

  modo: 'crear' | 'editar' = 'crear';
  formSubmitted = false;
  constructor(public modal: ModalService, private alertService: AlertService, private lineaService: LineaService, private sublineaService: SublineaService) { }
  boxIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>`
  searchTerm: string = '';
  filteredItems: Sublinea[] = [];
  sublinea: Sublinea[] = [];
  isOpen = false;
  openModal() { this.isOpen = true; }
  closeModal() { this.isOpen = false; }
  currentPage = 1;
  itemsPerPage = 5;
  @Input() value: string = '';
  @Output() valueChange = new EventEmitter<string>();
  @Input() options: Option[] = [];
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
  
  async ngOnInit() {
    await this.cargarSublinea();
    await this.cargarLinea();
  }

  async cargarSublinea() {
    this.sublinea = await this.sublineaService.obtenerSublinea();
    this.filteredItems = [...this.sublinea];
  }

  async handleSave(form: any) {
    this.formSubmitted = true;
    if (this.modo === 'crear') {
      if (form.invalid) {
        return;
      }
      this.sublineaService.crearSublinea(this.selected)
        .subscribe({
          next: async () => {
            this.alertService.success('Datos guardados');
            await this.cargarSublinea();
            this.closeModal();
          },
          error: (err) => {
            this.alertService.error(
              err.error?.message || 'Ocurrió un error'
            );
          }
        });
    } else {
      this.sublineaService.actualizarSublinea(
        this.selected.id,
        this.selected
      ).subscribe({
        next: async () => {
          await this.cargarSublinea();
          this.alertService.success('Datos modificados');
          this.closeModal();
        }
      });
    }
  }

  onChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.value = target.value;
    this.selected.linea = target.value;
  }

  openCreateModal() {
    this.formSubmitted = false;
    this.modo = 'crear';
    this.selected = {
      codigo: '',
      descripcion: '',
      linea: ''
    };
    this.value = '';
    this.isOpen = true;
  }

  openEditModal(item: any) {
    this.modo = 'editar';
    this.selected = { ...item };
    this.value = String(item.codigolinea);
    this.selected.linea = String(item.codigolinea);
    this.isOpen = true;
  }

  async cargarLinea() {
    const data = await this.lineaService.obtenerLinea();
    this.options = data.map((item: any) => ({
      value: item.codigo,
      label: item.descripcion
    }));
  }
}
