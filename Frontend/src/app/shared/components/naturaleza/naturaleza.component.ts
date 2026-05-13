import { PageBreadcrumbComponent } from '../common/page-breadcrumb/page-breadcrumb.component';
import { CommonModule } from '@angular/common';
import { InputFieldComponent } from '../form/input/input-field.component';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ButtonComponent } from '../ui/button/button.component';
import { ModalService } from '../../services/modal.service';
import { ModalComponent } from '../ui/modal/modal.component';
import { NaturalezaService } from '../../../core/services/naturaleza.service';
import { Naturaleza } from '../../../core/models/naturaleza.model';
import { FormsModule } from '@angular/forms';
import { AlertComponent } from '../ui/alert/alert.component';

export interface Option {
  value: string;
  label: string;
}

@Component({
  selector: 'app-naturaleza',
  imports: [
    CommonModule,
    ButtonComponent,
    InputFieldComponent,
    ModalComponent,
    PageBreadcrumbComponent,
    FormsModule,
    AlertComponent
  ],
  templateUrl: './naturaleza.component.html',
  styles: ``
})

export class NaturalezaComponent {
  selected: any = {
    codigo: '',
    descripcion: '',
     required: 'true'
  };
  showAlert = false;
  alertVariant: 'success' | 'error' | 'warning' | 'info' = 'success';
  alertTitle = '';
  alertMessage = '';
  modo: 'crear' | 'editar' = 'crear';
  formSubmitted = false;
  constructor(public modal: ModalService, private naturalezaService: NaturalezaService) { }

  boxIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>`
  searchTerm: string = '';
  filteredItems: Naturaleza[] = [];
  naturaleza: Naturaleza[] = [];
  isOpen = false;
  openModal() { this.isOpen = true; }
  closeModal() { this.isOpen = false; this.selected = {
    codigo: '',
    descripcion: ''
  }; }
  currentPage = 1;
  itemsPerPage = 5;
  @Input() value: string = '';
  @Output() valueChange = new EventEmitter<string>();
  @Input() options: Option[] = [];
  get totalPages(): number {
    return Math.ceil(this.filteredItems.length / this.itemsPerPage);
  }

  get currentItems(): Naturaleza[] {
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

    // Si el input está vacío
    if (!term) {
      this.filteredItems = [...this.naturaleza];
      return;
    }

    this.filteredItems = this.naturaleza.filter(item =>
      item.codigo?.toLowerCase().includes(term) ||
      item.descripcion?.toLowerCase().includes(term)
    );
  }
  async ngOnInit() {
    await this.cargarNaturaleza();
  }

  async cargarNaturaleza() {
    this.naturaleza =
      await this.naturalezaService.obtenerNaturaleza();

    // cargar tabla completa inicialmente
    this.filteredItems = [...this.naturaleza];
  }

  async handleSave(form: any) {
    this.formSubmitted = true;
    if (this.modo === 'crear') {
      if (form.invalid) {
        return;
      }
      
      this.naturalezaService.crearNaturaleza(this.selected)
        .subscribe({
          next: async () => {
            this.alertVariant = 'success';
            this.alertTitle = '';
            this.alertMessage = 'Datos guardados';
            this.showAlert = true;
            setTimeout(() => {
              this.showAlert = false;
            }, 1000);
            await this.cargarNaturaleza();

            this.closeModal();
          }
        });
    } else {
      this.naturalezaService.actualizarNaturaleza(
        this.selected.id,
        this.selected
      ).subscribe({
        next: async () => {
          await this.cargarNaturaleza();
          this.alertVariant = 'success';
          this.alertTitle = 'Bienvenido';
          this.alertMessage = 'Inicio de sesión exitoso';
          this.showAlert = true;
          setTimeout(() => {
            this.showAlert = false;
          }, 1000);
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
