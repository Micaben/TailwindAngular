export function getFechaHoy(): string {

  const hoy = new Date();

  const year = hoy.getFullYear();
  const month = String(hoy.getMonth() + 1).padStart(2, '0');
  const day = String(hoy.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export function formatInputDate(
  fecha: string | Date | null | undefined
): string {

  if (!fecha) {
    return '';
  }

  if (fecha instanceof Date) {
    return fecha.toISOString().split('T')[0];
  }

  return fecha.split('T')[0];
}