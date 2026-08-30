export interface Recetas {
  id?: number;
  fecha?: string;
  tipo_receta?: string;
  cliente_id?: number;
  cliente_nombre?: string;
  profesional_id?: number;
  profesional_nombre?: string;
  observaciones?: string;

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
  distancia_pupilar: number | null;
}