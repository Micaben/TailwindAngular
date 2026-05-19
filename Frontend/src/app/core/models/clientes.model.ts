export interface Clientes{
  id?: number;
  tipo_documento: string;
  ruc: string;
  tipo_persona: string;  
  nombres: string;
  apellido_paterno: string;
  apellido_materno: string;
  nombre_comercial: string;
  razon_social: string;
  direccion: string;
  nombre_contacto: string;  
  telefono: string;
  correo: string;
  estado: boolean;
  cargo_contacto: string;
  vendedor: string;
  moneda: string;
  direccion_entrega: string;
  ubigeo: string;  
  condicion_venta: string;
  ag_retencion: boolean;
}