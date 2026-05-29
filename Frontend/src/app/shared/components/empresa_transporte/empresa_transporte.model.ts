import { Modelobase } from '../../../core/models/modelobase.model';

export interface Empresa_transporte extends Modelobase {  
  ruc?: string;
  razon_social: string
}