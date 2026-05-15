import { PageBreadcrumbComponent } from '../common/page-breadcrumb/page-breadcrumb.component';
import { CommonModule } from '@angular/common';
import { InputFieldComponent } from '../form/input/input-field.component';
import { Component, Input, Output, EventEmitter, } from '@angular/core';
import { ButtonComponent } from '../ui/button/button.component';
import { ModalService } from '../../services/modal.service';
import { ModalComponent } from '../ui/modal/modal.component';
import { FormsModule } from '@angular/forms';
import { TableDropdownComponent } from '../common/table-dropdown/table-dropdown.component';
import { BadgeComponent } from '../ui/badge/badge.component';
import { ProductosService } from '../../../core/services/productos.service';
import { Productos } from '../../../core/models/productos.model';
import { NaturalezaService } from '../../../core/services/naturaleza.service';
export interface Option {
  value: string;
  label: string;
}


@Component({
  selector: 'app-basic-table-three',
  imports: [
    CommonModule,
    ButtonComponent,
    InputFieldComponent,
    TableDropdownComponent,
    BadgeComponent,
    ModalComponent,
    FormsModule,
    PageBreadcrumbComponent,
  ],
  templateUrl: './productos.component.html',
  styles: ``
})

export class ProductosComponent {
  selected: any = {
    codigo: '',
    descripcion: ''
  };
  constructor(public modal: ModalService, private naturalezaService: NaturalezaService, private productosService: ProductosService) { }

  boxIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>`
  productos: Productos[] = [];
  isOpen = false;
  openModal() { this.isOpen = true; }
  closeModal() { this.isOpen = false; }
  currentPage = 1;
  itemsPerPage = 5;
  @Input() value: string = '';
  @Output() valueChange = new EventEmitter<string>();
  @Input() options: Option[] = [];
  get totalPages(): number {
    return Math.ceil(this.productos.length / this.itemsPerPage);
  }

  get currentItems(): Productos[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.productos.slice(start, start + this.itemsPerPage);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  handleSave() {
    // Handle save logic here
    console.log('Saving changes...');
    this.modal.closeModal();
  }

  onChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.value = value;
    this.valueChange.emit(value);
  }

  getBadgeColor(estado: any): 'success' | 'warning' | 'error' {
    const value = String(estado).toLowerCase();
    if (value === 'true' || value === 'activo' || value === 'active') {
      return 'success';
    }
    if (value === 'pendiente' || value === 'pending') {
      return 'warning';
    }
    return 'error';
  }

  async ngOnInit() {
    this.productos = await this.productosService.obtenerProductos();
     await this.cargarNaturaleza();
    console.log(this.productos);
  }

  openEditModal(item: any) {
    this.selected = item;
    this.isOpen = true;
  }

  cambiarEstado(item: any) {

  this.productosService.toggleEstado(item.id).subscribe({
    next: (res: any) => {
      item.estado = res.estado; // actualiza UI sin recargar
    },
    error: (err) => {
      console.error(err);
    }
  });

}
async cargarNaturaleza() {

  const data = await this.naturalezaService.obtenerNaturaleza();

  this.options = data.map((item: any) => ({
    value: item.codigo,
    label: item.descripcion
  }));

}
}
