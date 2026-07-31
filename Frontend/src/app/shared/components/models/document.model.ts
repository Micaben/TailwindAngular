import { DetailItem } from './detail-item.model';

export interface DocumentModel {

  id?: number;
  fecha: string;
  observacion?: string;
  detalles: DetailItem[];
}