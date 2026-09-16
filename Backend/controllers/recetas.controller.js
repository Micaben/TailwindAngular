const recetasService = require('../services/recetas.service');

class RecetasController {
  async create(req, res) {

    const recetaId = await recetasService.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Receta registrada',
      data: {
        id: recetaId
      }
    });

  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const result =
        await recetasService.update(
          id,
          req.body
        );

      res.json({
        success: true,
        message: 'Receta actualizada',
        data: result
      });

    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  async obtenerSerie(req, res, next) {
    try {
      const data = await recetasService.obtenerSerie();
      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async listar(req, res) {
    try {
      const { mes, anio, texto } = req.query;
      const data = await recetasService.listar(
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
      const data = await recetasService.obtenerPorId(req.params.id);
      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async listarTipoOperacion(req, res) {
    try {
      const data = await recetasService.listarTipoOperacion();
      res.json(data);
    } catch (error) {
      next(error);
    }
  }

}

module.exports = new RecetasController();