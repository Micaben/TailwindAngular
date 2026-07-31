import { Modelobase } from '../../core/models/modelobase.model';

export interface Series extends Modelobase {  
  comprobante?: string;
  serie?: string;
  ultimo?: string;
 
}