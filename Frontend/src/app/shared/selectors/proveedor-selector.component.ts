import { Component, EventEmitter, Input, Output, inject, OnInit } from '@angular/core';
import { ProveedoresService } from '../../core/services/proveedores.service';
import { Proveedores } from '../../pages/proveedores/proveedores.model';
import { CrudTableComponent } from '../../shared/components/tables/crud-table/crud-table.component';
import { PROVEEDORES_TABLE_COLUMNS } from '../../pages/proveedores/proveedores_table_config';

@Component({
  selector: 'app-proveedor-selector',
  standalone: true,
  imports: [ CrudTableComponent],
  templateUrl: './proveedor-selector.component.html'
})
export class ProveedorSelectorComponent implements OnInit {

  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();
  @Output() select = new EventEmitter<any>();
  tableColumns = PROVEEDORES_TABLE_COLUMNS;
  proveedor: Proveedores[] = [];
  proveedorFiltered: Proveedores[] = [];

  searchProveedor(term: string) {
    const value = term.toLowerCase().trim();

    this.proveedorFiltered = this.proveedor.filter(c =>
      c.ruc?.toLowerCase().includes(value) ||
      c.razon_social?.toLowerCase().includes(value)
    );
  }

  selectProveedor(proveedor: Proveedores) {
    this.select.emit(proveedor);
    this.close.emit();
  }

  constructor(
    private proveedoresService: ProveedoresService
  ) { }

  ngOnInit(): void {
    this.proveedoresService.getAll().subscribe({
      next: (data) => {
        this.proveedor = data;
        this.proveedorFiltered = data;
      }
    });
  }

}