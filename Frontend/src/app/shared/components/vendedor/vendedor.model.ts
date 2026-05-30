import { Modelobase } from '../../../core/models/modelobase.model';

export interface Vendedor extends Modelobase {
  nombres?: string;
  dni?: string;
  direccion?: string;
  telefono?: string;
  correo?: string;
  estado?: boolean 
}