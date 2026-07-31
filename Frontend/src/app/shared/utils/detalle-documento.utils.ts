export function actualizarCantidad(
    item: any,
    cantidad: number
) {

    item.cantidad = cantidad;
    item.total =
        item.cantidad *
        item.precio;

}

export function actualizarPrecio(
    item: any,
    precio: number
) {

    item.precio = precio;
    item.total =
        item.cantidad *
        item.precio;

}

export function eliminarDetalle(
    lista: any[],
    index: number,
    nuevo: any
) {

    lista.splice(index, 1);

    if (lista.length === 0)
        lista.push(nuevo);

}