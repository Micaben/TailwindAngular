import { PageBreadcrumbComponent } from '../common/page-breadcrumb/page-breadcrumb.component';
import { CommonModule } from '@angular/common';
import { InputFieldComponent } from '../form/input/input-field.component';
import { Component, Input, Output, EventEmitter, } from '@angular/core';
import { ButtonComponent } from '../ui/button/button.component';
import { ModalService } from '../../services/modal.service';
import { ModalComponent } from '../ui/modal/modal.component';
import { FormsModule } from '@angular/forms';
import { BadgeComponent } from '../ui/badge/badge.component';
import { ProductosService } from '../../../core/services/productos.service';
import { Productos } from '../../../core/models/productos.model';
import { NaturalezaService } from '../../../core/services/naturaleza.service';
import { LineaService } from '../../../core/services/linea.service';
import { SublineaService } from '../../../core/services/sublinea.service';
import { UnidadMedidaService } from '../../../core/services/unidadmedida.service';
import { ColorService } from '../../../core/services/color.service';

export interface Option {
  value: string;
  label: string;
}

@Component({
  selector: 'app-clientes',
  imports: [
    CommonModule,
    ButtonComponent,
    InputFieldComponent,
    BadgeComponent,
    ModalComponent,
    FormsModule,
    PageBreadcrumbComponent,
  ],
  templateUrl: './clientes.component.html',
  styles: ``
})

export class ClientesComponent {
  selected: any = {
    codigo: '',
    descripcion: '',
    naturaleza: '',
    linea: '',
    sublinea: '',
    unidadmedida: '',
    color: '',
    proveedor: ''
  };
  constructor(public modal: ModalService, private naturalezaService: NaturalezaService, private lineaService: LineaService, private sublineaService: SublineaService, private unidadmedidaService: UnidadMedidaService, private colorService: ColorService, private productosService: ProductosService) { }
  modo: 'crear' | 'editar' = 'crear';
  formSubmitted = false;
  boxIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>`
  searchTerm: string = '';
  filteredItems: Productos[] = [];
  productos: Productos[] = [];
  today: string = new Date().toISOString().split('T')[0];
  isOpen = false;
  openModal() { this.isOpen = true; }
  closeModal() { this.isOpen = false; }
  currentPage = 1;
  itemsPerPage = 5;
  @Input() value: string = '';
  @Output() valueChange = new EventEmitter<string>();
  @Input() naturalezaoptions: Option[] = [];
  @Input() lineaoptions: Option[] = [];
  @Input() sublineaoptions: Option[] = [];
  @Input() unidadmedidaoptions: Option[] = [];
  @Input() coloroptions: Option[] = [];
  @Input() proveedoroptions: Option[] = [];
  @Input() type: string = 'text';
  expirationDate: string = '';
  @Input() placeholder?: string;
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

    console.log(this.productos);
    const today = new Date();

    today.setDate(today.getDate() + 30);

    this.expirationDate = today.toISOString().split('T')[0];
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

}
