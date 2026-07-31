import { Modelobase } from '../../core/models/modelobase.model';

export interface Conceptoventa extends Modelobase {
  comprobante?: string;
  tipo_operacion?: string;
  tipo_factura?: string;
  tipo_afectacion?:string;
  tipo_nc?: string;
  tipo_nd?: string;
  documento?: string;
}