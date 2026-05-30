import { TableColumn } from './table.component';

export const VENDEDOR_TABLE_COLUMNS: TableColumn[] = [
  {
    header: 'Código',
    field: 'codigo',
    width: '15%'
  },
  {
    header: 'Nombres',
    field: 'nombres',
    width: '25%'
  },
  {
    header: 'Correo',
    field: 'correo',
    width: '25%'
  },
  {
    header: 'Estado',
    type: 'badge',
    badge: (row) => ({
      label: row.licencia_vencida ? 'Inactivo' : 'Activo',
      color: row.licencia_vencida ? 'error' : 'success'
    }),
    width: '15%'
  }
];