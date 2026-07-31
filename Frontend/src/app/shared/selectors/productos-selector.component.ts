import { Component, EventEmitter, Input, Output, inject, OnInit } from '@angular/core';
import { Productos } from '../../pages/productos/productos.model';
import { CrudTableComponent } from '../../shared/components/tables/crud-table/crud-table.component';
import { PRODUCTOS_SELECTOR_TABLE_COLUMNS } from '../../shared/selectors/productos-selector-table-columns';
import { ProductosService } from '../../core/services/productos.service';

@Component({
  selector: 'app-productos-selector',
  standalone: true,
  imports: [CrudTableComponent],
  templateUrl: './productos-selector.component.html'
})

export class ProductosSelectorComponent implements OnInit {

  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();
  @Output() select = new EventEmitter<Productos>();

  tableColumns = PRODUCTOS_SELECTOR_TABLE_COLUMNS;

  productos: Productos[] = [];
  productosFiltered: Productos[] = [];

  constructor(
    private productosService: ProductosService
  ) {}

  ngOnInit(): void {
    this.productosService.getStock().subscribe({
      next: data => {
        console.log('PRODUCTOS', data);
        this.productos = data;
        this.productosFiltered = data;
      }
    });
  }

  searchProductos(term: string) {
    const value = term.toLowerCase().trim();

    this.productosFiltered = this.productos.filter(p =>
      p.codigo?.toLowerCase().includes(value) ||
      p.descripcion?.toLowerCase().includes(value)
    );
  }

  selectProducto(producto: Productos) {
    this.select.emit(producto);
  }

}