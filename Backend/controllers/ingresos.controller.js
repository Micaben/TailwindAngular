const ingresosService = require('../services/ingresos.service');

class IngresosController {
  async create(req, res) {

    const ingresoId = await ingresosService.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Ingreso registrado',
      data: {
        id: ingresoId
      }
    });

  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const result =
        await ingresosService.update(
          id,
          req.body
        );

      res.json({
        success: true,
        message: 'Ingreso actualizado',
        data: result
      });

    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  async obtenerSerie(req, res) {
    try {
      const data = await ingresosService.obtenerSerie();
      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async listar(req, res) {
    try {
      const { mes, anio, texto } = req.query;
      const data = await ingresosService.listar(
        mes,
        anio,
        texto
      );
      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async obtenerPorId(req, res) {
    try {
      const data = await ingresosService.obtenerPorId(req.params.id);
      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async listarTipoOperacion(req, res) {
    try {
      const data = await ingresosService.listarTipoOperacion();
      res.json(data);
    } catch (error) {
      next(error);
    }
  }

}

module.exports = new IngresosController();