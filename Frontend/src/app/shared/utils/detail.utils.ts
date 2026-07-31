export function createEmptyDetail() {
  return {
    codigo: '',
    descripcion: '',
    unidad_medida:'',
    cantidad: 1,
    precio: 0,
    total: 0
  };
}

export function calcularTotalLinea(
  cantidad: number,
  precio: number
): number {

  return Number(cantidad) *
         Number(precio);

}