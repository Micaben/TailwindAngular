import { Component, inject, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { finalize } from 'rxjs';
import { IngresosService } from '../ingresos/ingresos.service';
import { Ingresos } from '../../pages/ingresos/ingresos.model'
import { BaseCrudComponent } from '../../shared/components/base/components/base_crud.component';
import { IngresosFormModelComponent } from '../../pages/ingresos/ingresos-form-model.component';
import { DETALLE_TABLE_COLUMNS } from './detalle_table_config';
import { INGRESOS_TABLE_COLUMNS } from './ingresos_table_config';
import { DetailTableComponent } from '../../shared/components/detail-table/detail-table.component';
import { DocumentToolbarComponent } from '../../shared/components/document-toolbar/document-toolbar.component';
import { OptionsService } from '../../core/services/options.service';
import { Option } from '../../core/models/option.model';
import { forkJoin } from 'rxjs';
import { API } from '../../core/config/api.config';
import { getFechaHoy } from '../../shared/utils/date.utils';
import { SiguienteNumeroSerie } from '../../shared/utils/series.utils';
import { Productos } from '../productos/productos.model';
import { ProductosSelectorComponent } from '../../shared/selectors/productos-selector.component';
import { ModalComponent } from '../../shared/components/ui/modal/modal.component';
import { createEmptyDetail } from '../../shared/utils/detail.utils';
import { DocumentSearchComponent } from '../../shared/components/document-search/document-search.component';
import { calcularIgv, calcularSubtotal, calcularTotal } from '../../shared/utils/calculos.utils';
import { actualizarCantidad, actualizarPrecio, eliminarDetalle } from '../../shared/utils/detalle-documento.utils';

@Component({
  selector: 'app-ingresos-page',
  standalone: true,
  templateUrl: './ingresos.page.html',
  imports: [
    DocumentToolbarComponent,
    IngresosFormModelComponent,
    DetailTableComponent,
    ProductosSelectorComponent,
    DocumentSearchComponent,
    ModalComponent
  ]
})
export class IngresosPage extends BaseCrudComponent<Ingresos> {
  loadingGuardar = false;
  showBuscarModal = false;
  showProductosModal = false;
  protected override service = inject(IngresosService);
  detailColumns = DETALLE_TABLE_COLUMNS;
  searchColumns = INGRESOS_TABLE_COLUMNS;
  detalleItems: any[] = [];
  private optionsService = inject(OptionsService);
  serieOptions: Option[] = [];
  monedaOptions: Option[] = [];
  almacenOptions: Option[] = [];
  tipoOperacionOptions: Option[] = [];
  documentoReferenciaOptions: Option[] = [];
  documentos: any[] = [];

  override ngOnInit(): void {
    super.ngOnInit();
    this.state.update(state => ({
      ...state,
      selected: {
        ...state.selected,
        fecha: getFechaHoy(),
        fecha_compra: getFechaHoy(),
        moneda: '01',
        almacen: '01',
        tipo_operacion: '01',
      }
    }));
   
    this.loadOptions();
  }

  loadOptions(): void {
    forkJoin({
      serie: this.optionsService.getOptions(API.ingresosSerie, 'serie', 'serie'),
      monedas: this.optionsService.getOptions(API.moneda),
      almacen: this.optionsService.getOptions(API.almacen),
      tipoOperacion: this.optionsService.getOptions(API.tipoOperacion),
      documentoReferencia: this.optionsService.getOptions(API.documentos),
    }).subscribe({
      next: ({ serie, monedas, almacen, tipoOperacion, documentoReferencia }) => {
        this.serieOptions = serie;
        this.monedaOptions = monedas;
        this.almacenOptions = almacen;
        this.tipoOperacionOptions = tipoOperacion;
        this.documentoReferenciaOptions = documentoReferencia;
      },
      error: err => console.error(err)
    });
  }

  nuevoDocumento(): void {
    this.state.update(s => ({
      ...s,
      modo: 'crear',
      selected: this.getInitialDocument()
    }));

   
  }

  guardarDocumento(): void {
    this.loadingGuardar = true;
    const detalles = this.detalleItems.filter(
      x => x.codigo && x.cantidad > 0
    );

    if (!detalles.length) {
      this.loadingGuardar = false;
      return;
    }

    const documento = {
      ...this.state().selected,
      subtotal: this.subtotal,
      igv: this.igv,
      total: this.total,
      detalles
    };

    const isCreate =
      this.state().modo === 'crear';

    const request$ = isCreate
      ? this.service.create(documento)
      : this.service.update(
        this.state().selected.id!,
        documento
      );

    request$.pipe(
      finalize(() => {
        this.loadingGuardar = false;
      })
    ).subscribe({
      next: (res: any) => {
        console.log('RESPUESTA CREATE', res);
        console.log('Acutalizando');
        this.state.update(s => ({
          ...s,
          modo: 'editar',
          selected: {
            ...s.selected,
            id: Number(res.id.id)
          }
        }));

        this.alertService.success(
          isCreate
            ? 'Ingreso registrado'
            : 'Ingreso actualizado'
        );

      },
      error: err => {
        console.error(err);
        this.alertService.error(
          err.error?.message ||
          'Error procesando documento'
        );
      }
    });
  }

  buscarDocumento() {
    this.showBuscarModal = true;
    this.buscarIngresos({
      texto: '',
      mes: String(new Date().getMonth() + 1),
      anio: String(new Date().getFullYear())
    });
  }

  buscarIngresos(filtro: any) {
    this.service.getByPeriodo(filtro.mes, filtro.anio, filtro.texto)
      .subscribe(res => {
        console.log('INGRESOS', res);
        this.documentos = res;
      });
  }

  abrirDocumento(documento: Ingresos) {
    if (!documento.id) {
      console.error('Documento sin id');
      return;
    }

    this.showBuscarModal = false;
    this.service.getDocumento(documento.id)
      .subscribe(res => {

        // cabecera
        this.state.update(s => ({
          ...s,
          modo: 'editar',
          selected: {
            ...s.selected,
            ...res.cabecera
          }
        }));

        // detalle
        this.detalleItems = res.detalle.map(
          (item: any) => ({
            codigo: item.codigo,
            descripcion: item.descripcion,
            unidad_medida: item.unidad_medida,
            cantidad: item.cantidad,
            precio: item.precio,
            total: item.cantidad * item.precio
          })
        );
      });
  }

  imprimirDocumento(): void {
    console.log('Imprimir');
  }

  onSerieChange(serie: string): void {
    this.updateField('serie', serie);
    const siguiente = SiguienteNumeroSerie(
      serie,
      this.serieOptions
    );
    if (siguiente) {
      this.updateField('numero', siguiente);
    }
  }

  selectedRowIndex = -1;

  openProductosModal(index: number) {
    this.selectedRowIndex = index;
    this.showProductosModal = true;
  }

selectProducto(producto: Productos) {

    const detalle = {
        codigo: producto.codigo,
        descripcion: producto.descripcion,
        unidad_medida: producto.unidad_medida,
        cantidad: 1,
        precio: producto.precio,
        total: producto.precio
    };

    if (this.selectedRowIndex >= 0) {

        this.detalleItems[this.selectedRowIndex] = detalle;

    } else {

        this.detalleItems.push(detalle);

    }

    this.detalleItems = [...this.detalleItems];

    this.showProductosModal = false;
}

  selectBuscard(buscar: Productos) {
    this.showBuscarModal = false;
  }

  deleteDetail(index: number) {
    eliminarDetalle(
      this.detalleItems,
      index,
      createEmptyDetail()
    );

    this.detalleItems = [
      ...this.detalleItems
    ];
  }

  agregarProducto() {

    this.selectedRowIndex = -1;

    this.showProductosModal = true;

}

  reemplazarProducto(index: number, producto: Productos) {
    this.detalleItems[index] = {
      ...this.detalleItems[index],
      codigo: producto.codigo,
      descripcion: producto.descripcion,
      unidad_medida: producto.unidad_medida,
      precio: producto.precio,
      total: this.detalleItems[index].cantidad * producto.precio
    };

    this.detalleItems = [...this.detalleItems];
  }
  updateCantidad(event: any) {
    actualizarCantidad(
      event.item,
      Number(event.value)
    );
    this.detalleItems = [
      ...this.detalleItems
    ];
  }

  updatePrecio(event: any) {
    actualizarPrecio(
      event.item,
      Number(event.value)
    );

    this.detalleItems = [
      ...this.detalleItems
    ];
  }

  get subtotal() {
    return calcularSubtotal(this.detalleItems);
  }

  get total() {
    return calcularTotal(this.detalleItems);
  }

  get igv() {
    return calcularIgv(this.detalleItems);
  }

  private getInitialDocument(): Partial<Ingresos> {
    return {
      documento: '',
      numero: '',
      fecha: getFechaHoy(),
      fecha_compra: getFechaHoy(),
      proveedor: '',
      razonsocial: '',
      serie_numero: '',
      guia_remision: '',
      ocompra: '',
      referencia: '',
      moneda: '01',
      almacen: '01',
      tipo_operacion: '01'
    };
  }

}