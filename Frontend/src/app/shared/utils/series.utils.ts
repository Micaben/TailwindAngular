import { Option } from '../../core/models/option.model';

export function SiguienteNumeroSerie(
  serie: string,
  opciones: Option[]
): string | null {

  const seleccionada = opciones.find(
    x => x.value === serie
  );

  if (!seleccionada?.['ultimo']) return null;

  return (
    Number(seleccionada['ultimo']) + 1
  )
    .toString()
    .padStart(8, '0');
}