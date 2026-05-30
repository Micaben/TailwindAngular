
import { Transportista } from '../transportista/transportista.model';
import { TableColumn } from './table.component';

export const TRANSPORTISTA_TABLE_COLUMNS: TableColumn[] = [
  {
    header: 'Nombres',
    formatter: (row: Transportista) => `${row.nombres} ${row.apellido_paterno} ${row.apellido_materno}`,
    width: '35%',
  },
  {
    header: 'Licencia',
    field: 'licencia',
    width: '15%',
  },
  {
    header: 'Unidad',
    field: 'unidad',
    width: '15%',
  },
  {
    header: 'Placa',
    field: 'placa',
    width: '15%'
  },
  {
    header: 'Empresa',
    field: 'razon_social',
    width: '35%'
  }
];