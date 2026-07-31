export interface Productos {
  id?: number;
  naturaleza: string;
  linea: string;
  sublinea: string;
  codigo: string;
  descripcion: string;
  unidad_medida: string;
  color: string;
  peso: string;
  codigo_barras: string;
  numero_serie: string;
  numero_lote: string;
  codigo_sunat: string;
  codigo_gtin: string;
  principio: string;
  marca: string;
  procedencia: string;
  fecha_vencimiento: string | null;
  proveedor_nombre: string;
  proveedor: string;
  precio: number;
  estado: boolean;

}