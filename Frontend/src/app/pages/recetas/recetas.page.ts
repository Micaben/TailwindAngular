import { Component, inject, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { finalize } from 'rxjs';
import { RecetasService } from '../recetas/recetas.service';
import { DetalleReceta, Recetas } from '../../pages/recetas/recetas.model'
import { BaseCrudComponent } from '../../shared/components/base/components/base_crud.component';
import { RecetasFormModelComponent } from '../../pages/recetas/recetas-form-model.component';
import { DETALLE_RECETAS_COLUMNS } from './detalle_table_config';
import { RECETAS_TABLE_COLUMNS } from './recetas_table_config';
import { DocumentToolbarComponent } from '../../shared/components/document-toolbar/document-toolbar.component';
import { OptionsService } from '../../core/services/options.service';
import { Option } from '../../core/models/option.model';
import { forkJoin } from 'rxjs';
import { API } from '../../core/config/api.config';
import { getFechaHoy } from '../../shared/utils/date.utils';
import { SiguienteNumeroSerie } from '../../shared/utils/series.utils';
import { Productos } from '../productos/productos.model';
import { DocumentSearchComponent } from '../../shared/components/document-search/document-search.component';

@Component({
  selector: 'app-recetas-page',
  standalone: true,
  templateUrl: './recetas.page.html',
  imports: [
    DocumentToolbarComponent,
    RecetasFormModelComponent,
    DocumentSearchComponent
  ]
})
export class RecetasPage extends BaseCrudComponent<Recetas> {
  loadingGuardar = false;
  showBuscarModal = false;
  detalleItems: DetalleReceta[] = [];
  protected override service = inject(RecetasService);
  detailColumns = DETALLE_RECETAS_COLUMNS;
  searchColumns = RECETAS_TABLE_COLUMNS;

  private optionsService = inject(OptionsService);
  serieOptions: Option[] = [];
  monedaOptions: Option[] = [];
  documentos: any[] = [];

  override ngOnInit(): void {
    super.ngOnInit();
    this.detalleItems = [
      this.createEmptyDetail('OD'),
      this.createEmptyDetail('OI')
    ];
    this.state.update(state => ({
      ...state,
      selected: {
        ...state.selected,
        fecha: getFechaHoy(),
        fecha_compra: getFechaHoy(),
        moneda: '01',
      }
    }));

    this.loadOptions();
  }

  loadOptions(): void {
    forkJoin({
      serie: this.optionsService.getOptions(API.ingresosSerie, 'serie', 'serie'),
      monedas: this.optionsService.getOptions(API.moneda),
    }).subscribe({
      next: ({ serie, monedas }) => {
        this.serieOptions = serie;
        this.monedaOptions = monedas;
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

    this.detalleItems = [
      {
        ...this.createEmptyDetail('OD'),
        ojo: 'OD'
      },
      {
        ...this.createEmptyDetail('OI'),
        ojo: 'OI'
      }
    ];
  }

  guardarDocumento(): void {
    this.loadingGuardar = true;
    const detalles = this.detalleItems.filter(
      x => x.ojo && x.ojo.trim() !== ''
    );

    if (!detalles.length) {
      this.loadingGuardar = false;
      return;
    }

    const documento = {
      ...this.state().selected,
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

  abrirDocumento(documento: Recetas) {
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
  }

  selectBuscard(buscar: Productos) {
    this.showBuscarModal = false;
  }

  private getInitialDocument(): Partial<Recetas> {
    return {
      fecha: getFechaHoy(),
    };
  }
  onDetalleChange(event: {
    item: DetalleReceta;
    field: keyof DetalleReceta;
    value: any;
  }): void {
    console.log('Detalle actualizado:', event);
  }

  private createEmptyDetail(ojo: 'OD' | 'OI'): DetalleReceta {
    return {
      ojo,
      esfera: null,
      cilindro: null,
      eje: null,
      adicion: null,
      prisma: null,
      altura: null,
      distancia_pupilar: null
    };
  }
}