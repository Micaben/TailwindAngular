import { Modelobase } from '../../../core/models/modelobase.model';

export interface Transportista extends Modelobase {
  nombres?: string;
  apellido_paterno?: string;
  apellido_materno?: string;
  dni?: string;
  licencia?: string;
  unidad?: string;
  placa?: string;
  tipo_documento?: string;
  empresa_transporte?: string;   
}