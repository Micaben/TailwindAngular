import { PageBreadcrumbComponent } from '../common/page-breadcrumb/page-breadcrumb.component';
import { CommonModule } from '@angular/common';
import { InputFieldComponent } from '../form/input/input-field.component';
import { Component, Input, Output, EventEmitter, ElementRef, viewChild, AfterViewInit } from '@angular/core';
import { ButtonComponent } from '../ui/button/button.component';
import { ModalService } from '../../services/modal.service';
import { ModalComponent } from '../ui/modal/modal.component';
import { ConceptoService } from '../../../core/services/concepto.services';
import { TablasService } from '../../../core/services/tablas.service';
import { Concepto } from '../../../core/models/concepto.model';
import { Modelobase } from '../../../core/models/modelobase.model';
import { FormsModule } from '@angular/forms';
import { AutoFocusFirstDirective } from '../../directives/autofocus';
import { AlertService } from '../../../core/services/alert.services';
import { PaginationComponent } from '../../components/pagination/pagination.component';

interface Formulario {
  id?: number;
  codigo: string;
  descripcion: string;
  comprobante: string;
  tipo_factura: string;
  tipo_operacion: string;
  tipo_afectacion: string;
  tipo_nc: string;
  tipo_nd: string;
  documento: string;
}

interface Option {
  value: string;
  label: string;
}

const EMPTY_FORM: Formulario = {
  id: undefined,
  codigo: '',
  descripcion: '',
  comprobante: '',
  tipo_factura: '',
  tipo_operacion: '',
  tipo_afectacion: '',
  tipo_nc: '',
  tipo_nd: '',
  documento: ''
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
    PaginationComponent,
    AutoFocusFirstDirective,
  ],
  templateUrl: './concepto.component.html',
  styles: ``
})

export class ConceptoComponent {
  selected: Formulario = { ...EMPTY_FORM };
  modo: 'crear' | 'editar' = 'crear';
  formSubmitted = false;
  constructor(public modal: ModalService, private alertService: AlertService, private tablasService: TablasService, private conceptoService: ConceptoService) { }
  boxIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>`
  searchTerm: string = '';
  filteredItems: Concepto[] = [];
  concepto: Concepto[] = [];
  isOpen = false;
  openModal() { this.isOpen = true; }
  closeModal() { this.isOpen = false; }
  currentPage = 1;
  itemsPerPage = 5;
  @Input() tipo_afectacionoptions: Option[] = [];
  @Input() tipo_facturaoptions: Option[] = [];
  @Input() tipo_operacionoptions: Option[] = [];
  @Input() tipo_ncoptions: Option[] = [];
  @Input() tipo_ndoptions: Option[] = [];
  @Input() comprobanteoptions: Option[] = [];
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

    const isCreate = this.modo === 'crear';

    const request = isCreate
      ? this.conceptoService.crearConcepto(payload)
      : this.conceptoService.actualizarConcepto(
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

        await this.cargarConcepto();
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
      this.cargarConcepto(),
      this.cargarTipoAfectacion(),
      this.cargarTipoFactura(),
      this.cargarTipoOperacion(),
      this.cargarDocumentos(),
      this.cargarTipoND(),
      this.cargarTipoNC()

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
      comprobante: item.comprobante || '',
      tipo_factura: item.tipo_factura || '',
      tipo_operacion: item.tipo_operacion || '',
      tipo_afectacion: item.tipo_afectacion || '',
      tipo_nc: item.tipo_nc || '',
      tipo_nd: item.tipo_nd || '',
      documento: item.documento || '',
    };
    this.isOpen = true;
  }

  mapOptions<T>(data: T[], valueKey: keyof T, labelKey: keyof T): Option[] {
    return data.map(item => ({
      value: String(item[valueKey]),
      label: String(item[labelKey])
    }));
  }

  async cargarDocumentos() {
    const data = await this.tablasService.obtenerDocumentos();
    this.comprobanteoptions = this.mapOptions(
      data,
      'codigo',
      'descripcion'
    );
  }

  async cargarTipoAfectacion() {
    const data = await this.tablasService.obtenerTipoAfectacion();
    this.tipo_afectacionoptions = this.mapOptions(
      data,
      'codigo',
      'descripcion'
    );
  }

  async cargarTipoOperacion() {
    const data = await this.tablasService.obtenerTipoOperacion();
    this.tipo_operacionoptions = this.mapOptions(
      data,
      'codigo',
      'descripcion'
    );
  }

  async cargarTipoFactura() {
    const data = await this.tablasService.obtenerTipofactura();
    this.tipo_facturaoptions = this.mapOptions(
      data,
      'codigo',
      'descripcion'
    );
  }

  async cargarTipoNC() {
    const data = await this.tablasService.obtenerTipoNC();
    this.tipo_ncoptions = this.mapOptions(
      data,
      'codigo',
      'descripcion'
    );
  }

  async cargarTipoND() {
    const data = await this.tablasService.obtenerTipoND();
    this.tipo_ndoptions = this.mapOptions(
      data,
      'codigo',
      'descripcion'
    );
  }
}
