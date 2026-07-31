import { Component, EventEmitter, Input, Output, inject, OnInit } from '@angular/core';
import { ClientesService } from '../../core/services/clientes.services';
import { Clientes } from '../../pages/clientes/clientes.model';
import { CrudTableComponent } from '../../shared/components/tables/crud-table/crud-table.component';
import { CLIENTES_TABLE_COLUMNS } from '../../pages/clientes/clientes_table_config';

@Component({
  selector: 'app-cliente-selector',
  standalone: true,
  imports: [ CrudTableComponent],
  templateUrl: './cliente-selector.component.html'
})
export class ClienteSelectorComponent implements OnInit {

  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();
  @Output() select = new EventEmitter<any>();
  tableColumns = CLIENTES_TABLE_COLUMNS;
  cliente: Clientes[] = [];
  clienteFiltered: Clientes[] = [];

  searchClientes(term: string) {
    const value = term.toLowerCase().trim();

    this.clienteFiltered = this.cliente.filter(c =>
      c.ruc?.toLowerCase().includes(value) ||
      c.razon_social?.toLowerCase().includes(value)
    );
  }

  selectCliente(cliente: Clientes) {
    this.select.emit(cliente);
    this.close.emit();
  }

  constructor(
    private clienteService: ClientesService
  ) { }

  ngOnInit(): void {
    this.clienteService.getAll().subscribe({
      next: (data) => {
        this.cliente = data;
        this.clienteFiltered = data;
      }
    });
  }

}