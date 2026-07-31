import { TableColumn } from '../../shared/components/tables/table/table.component';

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
      label: row.estado ? 'Activo' : 'Inactivo',
      color: row.estado ? 'success' : 'error'
    }),
    width: '15%'
  }
];