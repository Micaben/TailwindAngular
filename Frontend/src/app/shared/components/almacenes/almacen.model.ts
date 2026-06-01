import { Modelobase } from '../../../core/models/modelobase.model';

export interface Almacen extends Modelobase {
  direccion?: string;
  telefono?: string;
  encargado?: string;
}