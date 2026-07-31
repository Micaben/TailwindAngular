import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { UbigeoService } from '../../../core/services/ubigeo.services';
import { CrudTableComponent } from '../../../shared/components/tables/crud-table/crud-table.component';
import { Ubigeo } from './ubigeo_model';
import { UBIGEO_TABLE_COLUMNS } from '../../../shared/components/ubigeo/ubigeo_table_config';

@Component({
  selector: 'app-ubigeo',
  standalone: true,
  imports: [CrudTableComponent],
  templateUrl: './ubigeo.component.html'
})

export class UbigeoComponent implements OnInit {
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();
  @Output() select = new EventEmitter<any>();
  tableColumns = UBIGEO_TABLE_COLUMNS;
  ubigeos: Ubigeo[] = [];
  ubigeosFiltered: Ubigeo[] = [];

  searchUbigeo(term: string) {
    const value = term.toLowerCase().trim();

    this.ubigeosFiltered = this.ubigeos.filter(u =>
      u.ubi_departamento?.toLowerCase().includes(value) ||
      u.ubi_provincia?.toLowerCase().includes(value) ||
      u.ubi_distrito?.toLowerCase().includes(value)
    );
  }

  selectUbigeo(ubigeo: Ubigeo) {
    this.select.emit(ubigeo);
    this.close.emit();
  }

  constructor(
    private ubigeoService: UbigeoService
  ) { }

  ngOnInit(): void {
    this.ubigeoService.getAll().subscribe({
      next: (data) => {
        this.ubigeos = data;
        this.ubigeosFiltered = data;
      }
    });
  }
}