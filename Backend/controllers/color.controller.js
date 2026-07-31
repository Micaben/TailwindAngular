const colorService = require('../services/color.service');

 class ColorController {

    async getAll(req, res) {
        try {
            const data = await colorService.listar();
            res.json(data);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Error color'
            });
        }
    }

    async create(req, res) {
        const { codigo } = req.body;
        try {
            const data = await colorService.crear(req.body);
            res.json({
                message: 'Color creado',
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
            await colorService.actualizar(id, req.body);
            res.json({
                message: 'Color actualizado'
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Error actualizando'
            });
        }
    }

}

module.exports = new ColorController();