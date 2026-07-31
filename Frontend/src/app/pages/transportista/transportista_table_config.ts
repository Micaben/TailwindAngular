
import { Transportista } from './transportista.model';
import { TableColumn } from '../../shared/components/tables/table/table.component';

export const TRANSPORTISTA_TABLE_COLUMNS: TableColumn[] = [
  {
    header: 'Nombres',
    formatter: (row: Transportista) => `${row.nombres} ${row.apellidopaterno} ${row.apellidomaterno}`,
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