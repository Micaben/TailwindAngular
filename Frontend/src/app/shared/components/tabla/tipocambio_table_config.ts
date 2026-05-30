import { TableColumn } from './table.component';

export const TIPOCAMBIO_TABLE_COLUMNS: TableColumn[] = [
  {
    header: 'Fecha',
    field: 'fecha',
    width: '15%',
    type: 'date'
  },
  {
    header: 'Compra',
    field: 'compra',
    width: '25%',
    type: 'number'
  },
  {
    header: 'Venta',
    field: 'venta',
    width: '25%',
    type: 'number'
  }
];