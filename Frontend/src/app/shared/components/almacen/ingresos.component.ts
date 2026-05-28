import { PageBreadcrumbComponent } from '../common/page-breadcrumb/page-breadcrumb.component';
import { CommonModule } from '@angular/common';
import { InputFieldComponent } from '../form/input/input-field.component';
import { Component, Input, Output, EventEmitter, ElementRef, viewChild, AfterViewInit } from '@angular/core';
import { ButtonComponent } from '../ui/button/button.component';
import { ModalService } from '../../services/modal.service';
import { ModalComponent } from '../ui/modal/modal.component';
import { CatalogosService } from '../../../shared/services/catalogo.service';
import { IngresosService } from '../../../core/services/ingresos.service';
import { Ingresos } from '../../../core/models/ingresos.model';
import { FormsModule } from '@angular/forms';
import { AutoFocusFirstDirective } from '../../directives/autofocus';
import { AlertService } from '../../../core/services/alert.services';
import { getFechaHoy } from '../../services/date.utils';
import { AutocompleteComponent } from '../../components/autocomplete/autocomplete.component';
import { Option } from '../../../core/models/option.model';
import { EMPTY_INGRESO } from '../../components/almacen/ingresos.constants';
import { SiguienteNumeroSerie } from '../../services/series.utils';

@Component({
  selector: 'app-almacen',
  imports: [
    CommonModule,
    ButtonComponent,
    InputFieldComponent,
    //ModalComponent,
    PageBreadcrumbComponent,
    FormsModule,
    AutocompleteComponent,
    AutoFocusFirstDirective,
  ],
  templateUrl: './ingresos.component.html',
  styles: ``
})

export class IngresosComponent {
  selected: Ingresos = { ...EMPTY_INGRESO };
  modo: 'crear' | 'editar' = 'crear';
  formSubmitted = false;
  constructor(public modal: ModalService, private alertService: AlertService, private catalogosService: CatalogosService, private ingresosService: IngresosService) { }
  boxIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>`
  searchTerm: string = '';
  filteredItems: Ingresos[] = [];
  ingresos: Ingresos[] = [];
  isOpen = false;
  openModal() { this.isOpen = true; }
  closeModal() { this.isOpen = false; }
  currentPage = 1;
  itemsPerPage = 5;
  @Input() serieoptions: Option[] = [];
  @Input() tipo_operacionoptions: Option[] = [];
  @Input() monedaoptions: Option[] = [];
  @Input() razonsocialoptions: Option[] = [];
  @Input() almacenoptions: Option[] = [];
  @Input() doc_referenciaoptions: Option[] = [];
  searchRazonsocial = '';
  filteredRazonsocial: any[] = [];
  showDropdown = false;
  get totalPages(): number {
    return Math.ceil(this.filteredItems.length / this.itemsPerPage);
  }

  get currentItems(): Ingresos[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredItems.slice(start, start + this.itemsPerPage);
  }

  filterTable() {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) {
      this.filteredItems = [...this.ingresos];
      return;
    }
  }

  async cargarIngresos() {
    try {
      this.ingresos = await this.ingresosService.obtenerIngresos();
      this.filteredItems = [...this.ingresos];
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
      ? this.ingresosService.crearIngresos(payload)
      : this.ingresosService.actualizarIngresos(
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

        await this.cargarIngresos();
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
    [
      this.serieoptions,
      this.razonsocialoptions,
      this.tipo_operacionoptions,
      this.monedaoptions,
      this.almacenoptions,
      //this.doc_referenciaoptions
    ] = await Promise.all([
      this.catalogosService.obtenerSeries(),
      this.catalogosService.obtenerProveedores(),
      this.catalogosService.obtenerTipoOperacion(),
      this.catalogosService.obtenerMonedas(),
      //this.catalogosService.obtenerAlmacenes(),
      this.catalogosService.obtenerDocumentos()
    ]);
    this.filteredRazonsocial = [
      ...this.razonsocialoptions
    ];
    this.selected.fecha = getFechaHoy();
    this.selected.fecha_compra = getFechaHoy();
  }

  openCreateModal() {
    this.formSubmitted = false;
    this.modo = 'crear';
    this.selected = { ...EMPTY_INGRESO };
    this.isOpen = true;
  }

  async openEditModal(item: Ingresos) {
    this.formSubmitted = false;
    this.modo = 'editar';
    this.isOpen = true;
  }

  onSerieChange() {
    const numero = SiguienteNumeroSerie(
      this.selected.serie,
      this.serieoptions
    );
    if (numero) {
      this.selected.numero = numero;
    }
  }

  onProveedorSelected(option: Option) {
    this.selected.razonsocial = option.value;
    this.selected.proveedor = option.ruc || '';
  }

}
