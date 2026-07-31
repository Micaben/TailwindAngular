import { Modelobase } from '../../core/models/modelobase.model';

export interface Transportista extends Modelobase {
  nombres?: string;
  apellidopaterno?: string;
  apellidomaterno?: string;
  dni?: string;
  licencia?: string;
  unidad?: string;
  placa?: string;
  tipo_documento?: string;
  ruc?: string;
  empresatransporte?: string;   
}