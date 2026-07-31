import { Component, inject, OnInit } from '@angular/core';
import { CrudTableComponent } from '../../shared/components/tables/crud-table/crud-table.component';
import { ProductosService } from '../../core/services/productos.service';
import { Productos } from '../../pages/productos/productos.model';
import { PRODUCTOS_TABLE_COLUMNS } from './productos_table_config';
import { BaseCrudComponent } from '../../shared/components/base/components/base_crud.component';
import { ProductosFormModelComponent } from '../../pages/productos/productos-form-model.component';
import { OptionsService } from '../../core/services/options.service';
import { Option } from '../../core/models/option.model';
import { forkJoin } from 'rxjs';
import { API } from '../../core/config/api.config';

@Component({
  selector: 'app-productos-page',
  standalone: true,
  templateUrl: './productos.page.html',
  imports: [
    CrudTableComponent,
    ProductosFormModelComponent,
  ]
})

export class ProductosPage extends BaseCrudComponent<Productos> {
  protected override getInitialData(): Partial<Productos> {
      return {
        estado: true
      };
    }
  protected override service = inject(ProductosService);
  readonly tableColumns = PRODUCTOS_TABLE_COLUMNS;
  private optionsService = inject(OptionsService);
  naturalezaOptions: Option[] = [];
  lineaOptions: Option[] = [];
  marcaOptions: Option[] = [];
  colorOptions: Option[] = [];
  proveedorOptions: Option[] = [];
  unidadmedidaOptions: Option[] = [];
  sublineaOptions: Option[] = [];
  allSublineaOptions: Option[] = [];

  override ngOnInit(): void {
    super.ngOnInit();
    this.loadOptions();
  }

  loadOptions(): void {
    forkJoin({
      naturaleza: this.optionsService.getOptions(API.naturaleza),
      linea: this.optionsService.getOptions(API.linea),
      marca: this.optionsService.getOptions(API.marca),
      color: this.optionsService.getOptions(API.color),
      unidadmedida: this.optionsService.getOptions(API.unidadmedida),
      sublinea: this.optionsService.getOptions(API.sublinea),
      proveedor: this.optionsService.getOptions(API.proveedores, 'ruc', 'razon_social'),
    }).subscribe({
      next: ({ naturaleza, linea, marca, color, unidadmedida, sublinea, proveedor }) => {
        this.naturalezaOptions = naturaleza;
        this.lineaOptions = linea;
        this.marcaOptions = marca;
        this.colorOptions = color;
        this.unidadmedidaOptions = unidadmedida;
        this.proveedorOptions = proveedor;

        // Guardar todas
        this.allSublineaOptions = sublinea;
        // Inicialmente vacío
        this.sublineaOptions = [];
      },
      error: err => console.error(err)
    });
  }

  private cargarSublineas(lineaId: string): void {

    this.sublineaOptions = this.allSublineaOptions.filter(
      x => x['codigolinea'] === lineaId
    );
  }

  onLineaChange(lineaId: string): void {
    this.cargarSublineas(lineaId);
  }

  override openEdit(item: Productos): void {
    this.cargarSublineas(item.linea);
    super.openEdit(item);
  }

}