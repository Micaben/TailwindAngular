// services/stock.service.js

class StockService {

    async incrementarStock(client, codigoProducto, almacen, cantidad) {

        await client.query(
            `
            INSERT INTO stock_productos
            (
                producto,
                almacen,
                stock_actual,
                stock_disponible,
                stock_pedido
            )
            VALUES
            (
                $1, $2, $3, $3, 0
            )
            ON CONFLICT (producto, almacen)
            DO UPDATE
            SET
                stock_actual = stock_productos.stock_actual + EXCLUDED.stock_actual,
                stock_disponible = stock_productos.stock_disponible + EXCLUDED.stock_disponible
            `,
            [
                codigoProducto,
                almacen,
                cantidad
            ]
        );
    }

    async disminuirStock(client, codigoProducto, almacen, cantidad) {

        await client.query(
            `
            INSERT INTO stock_productos
            (
                producto,
                almacen,
                stock_actual,
                stock_disponible,
                stock_pedido
            )
            VALUES
            (
                $1, $2, -$3, -$3, 0
            )
            ON CONFLICT (producto, almacen)
            DO UPDATE
            SET
                stock_actual = stock_productos.stock_actual - $3,
                stock_disponible = stock_productos.stock_disponible - $3
            `,
            [
                codigoProducto,
                almacen,
                cantidad
            ]
        );
    }
}

module.exports = new StockService();