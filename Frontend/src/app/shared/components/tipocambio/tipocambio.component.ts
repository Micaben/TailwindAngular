import { PageBreadcrumbComponent } from '../common/page-breadcrumb/page-breadcrumb.component';
import { CommonModule } from '@angular/common';
import { InputFieldComponent } from '../form/input/input-field.component';
import { Component, Input, Output, EventEmitter, ElementRef, viewChild, AfterViewInit } from '@angular/core';
import { ButtonComponent } from '../ui/button/button.component';
import { ModalService } from '../../services/modal.service';
import { ModalComponent } from '../ui/modal/modal.component';
import { TipocambioService } from '../../../core/services/tipocambio.service';
import { Tipocambio } from '../../../core/models/tipocambio.model';
import { FormsModule } from '@angular/forms';
import { AutoFocusFirstDirective } from '../../../shared/directives/autofocus';
import { AlertService } from '../../../core/services/alert.services';
import { PaginationComponent } from '../../components/pagination/pagination.component';

interface Formulario {
  id?: number;
  fecha: string;
  compra: string;
  venta: string;
}

interface Option {
  value: string;
  label: string;
}

const EMPTY_FORM: Formulario = {
  id: undefined,
  fecha: '',
  compra: '',
  venta: '',
};

@Component({
  selector: 'app-tipocambio',
  imports: [
    CommonModule,
    ButtonComponent,
    InputFieldComponent,
    PaginationComponent,
    ModalComponent,
    PageBreadcrumbComponent,
    FormsModule,
    AutoFocusFirstDirective,
  ],
  templateUrl: './tipocambio.component.html',
  styles: ``
})

export class TipocambioComponent {
  selected: Formulario = { ...EMPTY_FORM };
  modo: 'crear' | 'editar' = 'crear';
  formSubmitted = false;
  fecha: string = '';
  constructor(public modal: ModalService, private alertService: AlertService, private tipocambioService: TipocambioService) { }
  boxIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>`
  searchTerm: string = '';
  filteredItems: Tipocambio[] = [];
  tipocambio: Tipocambio[] = [];
  isOpen = false;
  openModal() { this.isOpen = true; }
  closeModal() { this.isOpen = false; }
  currentPage = 1;
  itemsPerPage = 5;
  @Input() options: Option[] = [];
  get totalPages(): number {
    return Math.ceil(this.filteredItems.length / this.itemsPerPage);
  }

  get currentItems(): Tipocambio[] {
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
      this.filteredItems = [...this.tipocambio];
      return;
    }

    this.filteredItems = this.tipocambio.filter(item =>
      item.fecha?.toLowerCase().includes(term) ||
      item.compra?.toLowerCase().includes(term)
    );
  }

  async cargarTipocambio() {
    try {
      this.tipocambio = await this.tipocambioService.obtenerTipocambio();
      this.filteredItems = [...this.tipocambio];
    } catch (error) {
      this.alertService.error('Error cargando datos');
    }
  }

  async handleSave(form: any) {
    this.formSubmitted = true;
    if (form.invalid) {
      return;
    }

    const payload = {
      ...this.selected,
      fecha: this.selected.fecha || null, //EJEMPLO PARA VARIAS FECHAS 
      //fechaFin: this.selected.fechaFin || null,
    };

    const isCreate = this.modo === 'crear';

    const request = isCreate
      ? this.tipocambioService.crearTipocambio(payload)
      : this.tipocambioService.actualizarTipocambio(
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

        await this.cargarTipocambio();
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
      this.cargarTipocambio(),
    ]);
  }

  openCreateModal() {
    this.formSubmitted = false;
    this.modo = 'crear';
    this.selected = { ...EMPTY_FORM };
    this.selected.fecha = this.getFechaHoy();
    this.isOpen = true;

  }

  async openEditModal(item: Tipocambio) {
    this.formSubmitted = false;
    this.modo = 'editar';
    let fechaFormateada = '';

    if (item.fecha) {
      const fecha = new Date(item.fecha);
      fechaFormateada = fecha.toISOString().split('T')[0];
    }

    this.selected = {
      id: item.id,
      fecha: fechaFormateada,
      compra: item.compra || '',
      venta: item.venta || '',
    };
    this.isOpen = true;
  }

  getFechaHoy(): string {
    const hoy = new Date();
    const year = hoy.getFullYear();
    const month = String(hoy.getMonth() + 1).padStart(2, '0');
    const day = String(hoy.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }
}
