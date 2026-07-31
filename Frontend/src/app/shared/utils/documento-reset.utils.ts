import { getFechaHoy } from './date.utils';

export function limpiarDocumento(
    cabeceraInicial: any,
    detalleInicial: any[]
) {

    return {
        cabecera: {
            ...cabeceraInicial
        },
        detalle: [...detalleInicial]
    };

}