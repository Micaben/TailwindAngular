export interface Recetas {
  id?: number;
  serie: string;
  numero: string;
  fecha?: string;
  tipo_receta?: string;
  cliente_id?: number;
  cliente_nombre?: string;
  profesional_id?: number;
  profesional_nombre?: string;
  observaciones?: string;
base_prisma?: string;
distancia_pupilar?: number | null;
  detalles?: DetalleReceta[];
}

export interface DetalleReceta {
  id?: number;
  receta_id?: number;

  ojo: string;
  esfera: number | null;
  cilindro: number | null;
  eje: number | null;
  adicion: number | null;
  prisma: number | null;
  altura: number | null;
  base_prisma: string;
  agudeza_visual_lejos: string;
  agudeza_visual_cerca: string;
  distancia_pupilar: number | null;
}