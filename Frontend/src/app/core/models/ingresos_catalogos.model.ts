import { Option } from '../../core/models/option.model';

export interface IngresosCatalogs {
  series: Option[];
  tipoOperacion: Option[];
  monedas: Option[];
  proveedores: Option[];
  almacenes: Option[];
  documentos: Option[];
}