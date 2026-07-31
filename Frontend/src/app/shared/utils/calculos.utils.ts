export function calcularTotal(detalles: any[]): number {

  return detalles.reduce(
    (sum, item) =>
      sum + Number(item.total || 0),
    0
  );
}


export function calcularSubtotal(
  detalles: any[],
  porcentajeIgv = 0.18
): number {

  const total = calcularTotal(detalles);

  return total / (1 + porcentajeIgv);
}


export function calcularIgv(
  detalles:any[],
  porcentajeIgv = 0.18
): number {

  return calcularTotal(detalles)
    - calcularSubtotal(detalles, porcentajeIgv);

}