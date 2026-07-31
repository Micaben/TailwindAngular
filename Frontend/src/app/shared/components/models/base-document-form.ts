import { DetailItem } from '../models/detail-item.model';

export abstract class BaseDocumentForm {

  detalleItems: DetailItem[] = [];

  addDetail(item: DetailItem) {
    this.detalleItems.push(item);
  }

  removeDetail(index: number) {
    this.detalleItems.splice(index, 1);
  }

}