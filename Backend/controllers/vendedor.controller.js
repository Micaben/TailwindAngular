const vendedorService = require('../services/vendedor.service');

 class VendedorController {

    async getAll(req, res) {
        try {
            const data = await vendedorService.listar();
            res.json(data);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Error vendedor'
            });
        }
    }

    async create(req, res) {
        const { codigo } = req.body;
        try {
            const data = await vendedorService.crear(req.body);
            res.json({
                message: 'Vendedor creado',
                data
            });

        } catch (error) {
            console.error(error);
            if (error.code === '23505') {
                return res.status(400).json({
                    message: `El código ${codigo} ya existe`
                });
            }

            if (error.code === '23514') {
                return res.status(400).json({
                    message: 'El código debe tener 2 dígitos'
                });
            }

            res.status(500).json({
                message: 'Error interno del servidor'
            });
        }

    }

    async update(req, res) {
        const { id } = req.params;
        try {
            await vendedorService.actualizar(id, req.body);
            res.json({
                message: 'Vendedor actualizado'
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Error actualizando'
            });
        }
    }

}

module.exports = new VendedorController();