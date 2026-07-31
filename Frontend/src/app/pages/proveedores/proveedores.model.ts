export interface Proveedores{
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
  pais: string;
  correo: string;
  estado: boolean;
}