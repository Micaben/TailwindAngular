export interface Transportista{
  id?: number;
  empresa_transporte: string;
  nombres: string;
  dni: string;
  licencia: string;
  unidad: string;
  placa: string;
  apellido_paterno: string;
  apellido_materno: string;
  tipo_documento: string;
  razon_social: string;
  estado: boolean;
}