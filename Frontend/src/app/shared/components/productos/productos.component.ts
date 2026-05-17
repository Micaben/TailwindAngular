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
import { ProveedoresService } from '../../../core/services/proveedores.service';
import { SublineaService } from '../../../core/services/sublinea.service';
import { UnidadMedidaService } from '../../../core/services/unidadmedida.service';
import { ColorService } from '../../../core/services/color.service';

interface ProductoForm {
  codigo: string;
  descripcion: string;
  naturaleza: string;
  linea: string;
  sublinea: string;
  unidadmedida: string;
  color: string;
  proveedor: string;
}

interface Option {
  value: string;
  label: string;
}

@Component({
  selector: 'app-productos',
  imports: [
    CommonModule,
    ButtonComponent,
    InputFieldComponent,
    BadgeComponent,
    ModalComponent,
    FormsModule,
    PageBreadcrumbComponent,
  ],
  templateUrl: './productos.component.html',
  styles: ``
})

export class ProductosComponent {
  selected: ProductoForm = {
    codigo: '',
    descripcion: '',
    naturaleza: '',
    linea: '',
    sublinea: '',
    unidadmedida: '',
    color: '',
    proveedor: ''
  };
  constructor(public modal: ModalService, private naturalezaService: NaturalezaService, private proveedoresService: ProveedoresService, private lineaService: LineaService, private sublineaService: SublineaService, private unidadmedidaService: UnidadMedidaService, private colorService: ColorService, private productosService: ProductosService) { }
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
  naturalezaoptions: Option[] = [];
  lineaoptions: Option[] = [];
  sublineaoptions: Option[] = [];
  unidadmedidaoptions: Option[] = [];
  coloroptions: Option[] = [];
  proveedoroptions: Option[] = [];
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
    const today = new Date();
    today.setDate(today.getDate() + 30);

    this.expirationDate = today.toISOString().split('T')[0];

    await Promise.all([
      this.cargarNaturaleza(),
      this.cargarLinea(),
      this.cargarUnidadmedida(),
      this.cargarColor(),
      this.cargarProveedor()
    ]);

    this.productos = await this.productosService.obtenerProductos();
    console.log(this.productos);
  }

  openCreateModal() {
    this.formSubmitted = false;
    this.modo = 'crear';
    this.value = '';
    this.isOpen = true;
  }

  openEditModal(item: Productos) {
    this.modo = 'editar';

    this.selected = {
      codigo: item.codigo || '',
      descripcion: item.descripcion || '',
      naturaleza: item.naturaleza || '',
      linea: item.linea || '',
      sublinea: item.sublinea || '',
      unidadmedida: item.unidadmedida || '',
      color: item.color || '',
      proveedor: item.proveedor || ''
    };

    this.isOpen = true;
  }

  async onLineaChange(event: Event) {
    const lineaId = (event.target as HTMLSelectElement).value;
    this.selected.sublinea = '';
    await this.cargarSublinea(lineaId);
  }

  cambiarEstado(item: Productos) {
    this.productosService.toggleEstado(item.id).subscribe({
      next: (res: any) => {
        item.estado = res.estado; // actualiza UI sin recargar
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  mapOptions(data: any[], valueKey: string, labelKey: string) {
    return data.map(item => ({
      value: item[valueKey],
      label: item[labelKey]
    }));
  }

  async cargarSublinea(lineaId: string) {
    this.sublineaoptions = [];
    const data = await this.sublineaService
      .getSublineasByLinea(lineaId);
    this.sublineaoptions = this.mapOptions(
      data,
      'codigo',
      'descripcion'
    );
  }
  async cargarLinea() {
    const data = await this.lineaService.obtenerLinea();
    this.lineaoptions = this.mapOptions(
      data,
      'codigo',
      'descripcion'
    );
  }

  async cargarNaturaleza() {
    const data = await this.naturalezaService.obtenerNaturaleza();
    this.naturalezaoptions = this.mapOptions(
      data,
      'codigo',
      'descripcion'
    );
  }

  async cargarUnidadmedida() {
    const data = await this.unidadmedidaService.obtenerUnidadMedida();
    this.unidadmedidaoptions = this.mapOptions(
      data,
      'codigo',
      'descripcion'
    );
  }

  async cargarColor() {
    const data = await this.colorService.obtenerColor();
    this.coloroptions = this.mapOptions(
      data,
      'codigo',
      'descripcion'
    );
  }

  async cargarProveedor() {
    const data = await this.proveedoresService.obtenerProveedor();
    this.proveedoroptions = this.mapOptions(
      data,
      'ruc',
      'razon_social'
    );
  }
}
