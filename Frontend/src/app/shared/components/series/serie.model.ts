import { Modelobase } from '../../../core/models/modelobase.model';

export interface Serie extends Modelobase {  
  comprobante?: string;
  serie?: string;
  ultimo?: string;
 
}