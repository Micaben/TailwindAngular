import { Modelobase } from '../../../core/models/modelobase.model';

export interface Tipocambio extends Modelobase {
    fecha?: string;
    compra?: number;
    venta?: number;
}