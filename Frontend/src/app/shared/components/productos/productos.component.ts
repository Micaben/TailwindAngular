import { PageBreadcrumbComponent } from '../common/page-breadcrumb/page-breadcrumb.component';
import { CommonModule } from '@angular/common';
import { InputFieldComponent } from '../form/input/input-field.component';
import { Component, Input, Output, OnInit, EventEmitter, } from '@angular/core';
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
import { AlertService } from '../../../core/services/alert.services';


interface ProductoForm {
  id?: number;
  naturaleza: string;
  linea: string;
  sublinea: string;
  codigo: string;
  descripcion: string;
  unidad_medida: string;
  color: string;
  peso: string;
  codigo_barras: string;
  numero_serie: string;
  numero_lote: string;
  codigo_sunat: string;
  codigo_gtin: string;
  principio: string;
  marca: string;
  procedencia: string;
  fecha_vencimiento: string | null;
  proveedor_nombre: string;
  proveedor: string;
  estado: boolean;

}

interface Option {
  value: string;
  label: string;
}

const EMPTY_PRODUCTO_FORM: ProductoForm = {
  id: undefined,
  naturaleza: '',
  linea: '',
  sublinea: '',
  codigo: '',
  descripcion: '',
  unidad_medida: '',
  color: '',
  peso: '',
  codigo_barras: '',
  numero_serie: '',
  numero_lote: '',
  codigo_sunat: '',
  codigo_gtin: '',
  principio: '',
  marca: '',
  procedencia: '',
  fecha_vencimiento: null,
  proveedor_nombre: '',
  proveedor: '',
  estado: true,
};

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

export class ProductosComponent implements OnInit {
  selected: ProductoForm = { ...EMPTY_PRODUCTO_FORM };
  filteredItems: Productos[] = [];
  productos: Productos[] = [];
  naturalezaoptions: Option[] = [];
  lineaoptions: Option[] = [];
  sublineaoptions: Option[] = [];
  unidadmedidaoptions: Option[] = [];
  coloroptions: Option[] = [];
  proveedoroptions: Option[] = [];
  modo: 'crear' | 'editar' = 'crear';
  isOpen = false;
  formSubmitted = false;
  currentPage = 1;
  itemsPerPage = 5;
  constructor(public modal: ModalService, private alertService: AlertService, private naturalezaService: NaturalezaService, private proveedoresService: ProveedoresService, private lineaService: LineaService, private sublineaService: SublineaService, private unidadmedidaService: UnidadMedidaService, private colorService: ColorService, private productosService: ProductosService) { }
  boxIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>`
  searchTerm: string = '';
  openModal() { this.isOpen = true; }
  closeModal() { this.isOpen = false; }

  get totalPages(): number {
    return Math.ceil(this.productos.length / this.itemsPerPage);
  }

  get currentItems(): Productos[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredItems.slice(start, start + this.itemsPerPage);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  async cargarProducto() {
    try {
      this.productos = await this.productosService.obtenerProductos();
      this.filteredItems = [...this.productos];
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
      fecha_vencimiento: this.selected.fecha_vencimiento || null
    };
    console.log(payload);
    const request =
      this.modo === 'crear'
        ? this.productosService.crearProducto(payload)
        : this.productosService.actualizarProducto(
          this.selected.id!,
          payload
        );

    request.subscribe({
      next: async () => {
        await this.cargarProducto();

        this.alertService.success(
          this.modo === 'crear'
            ? 'Datos guardados'
            : 'Datos modificados'
        );

        this.closeModal();
        this.selected = { ...EMPTY_PRODUCTO_FORM };
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
      this.cargarProducto(),
      this.cargarNaturaleza(),
      this.cargarLinea(),
      this.cargarUnidadmedida(),
      this.cargarColor(),
      this.cargarProveedor()
    ]);
  }

  openCreateModal() {
    this.formSubmitted = false;
    this.modo = 'crear';
    this.selected = { ...EMPTY_PRODUCTO_FORM };
    this.isOpen = true;
  }

  async openEditModal(item: Productos) {
    this.formSubmitted = false;
    this.modo = 'editar';
    this.selected = {
      id: item.id,
      codigo: item.codigo || '',
      descripcion: item.descripcion || '',
      naturaleza: item.naturaleza || '',
      linea: item.linea || '',
      sublinea: '',
      unidad_medida: item.unidad_medida || '',
      color: item.color || '',
      proveedor: item.proveedor || '',
      peso: item.peso || '',
      codigo_barras: item.codigo_barras || '',
      numero_serie: item.numero_serie || '',
      numero_lote: item.numero_lote || '',
      codigo_sunat: item.codigo_sunat || '',
      codigo_gtin: item.codigo_gtin || '',
      principio: item.principio || '',
      marca: item.marca || '',
      procedencia: item.procedencia || '',
      fecha_vencimiento: item.fecha_vencimiento ? new Date(item.fecha_vencimiento).toISOString().split('T')[0] : '',
      proveedor_nombre: item.proveedor_nombre || '',
      estado: item.estado ?? true
    };
    if (item.linea) {
      await this.cargarSublinea(item.linea);
    }
    this.selected.sublinea = item.sublinea || '';

    this.isOpen = true;
  }

  mapOptions<T>(data: T[], valueKey: keyof T, labelKey: keyof T): Option[] {
    return data.map(item => ({
      value: String(item[valueKey]),
      label: String(item[labelKey])
    }));
  }

  async onLineaChange() {
    this.selected.sublinea = '';
    if (!this.selected.linea) {
      this.sublineaoptions = [];
      return;
    }
    await this.cargarSublinea(this.selected.linea);
  }

  async cargarSublinea(lineaId: string) {
    try {
      this.sublineaoptions = [];
      const data =
        await this.sublineaService.getSublineasByLinea(lineaId);
      this.sublineaoptions = this.mapOptions(
        data,
        'codigo',
        'descripcion'
      );
    } catch (error) {
      console.error('Error cargando sublíneas', error);
      this.sublineaoptions = [];
    }
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

  onProveedorChange(ruc: string) {
    this.selected.proveedor = ruc;
  }

  /*cambiarEstado(item: Productos) {
    this.productosService.toggleEstado(item.id).subscribe({
      next: (res: any) => {
        item.estado = res.estado; // actualiza UI sin recargar
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
 
  onChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.value = value;
    this.valueChange.emit(value);
  }*/

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
}
