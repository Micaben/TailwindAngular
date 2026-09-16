const recetasRepository = require('../repositories/recetas.repository');

class RecetasService {
  async create(documento) {
    if (!documento.detalles?.length) {
      throw new Error('Debe registrar al menos un producto en el detalle');
    }
    return await recetasRepository.create(documento);
  }

  async update(id, documento) {
    if (!documento.detalles?.length) {
      throw new Error(
        'Debe registrar al menos un producto en el detalle'
      );
    }
    return await recetasRepository.update(
      id,
      documento
    );
  }

  async obtenerSerie() {
    return await recetasRepository.obtenerSerie();
  }

  async listar(mes, anio, texto) {
    return await recetasRepository.listar(mes, anio, texto);
  }

  async obtenerPorId(id) {
    return await recetasRepository.obtenerPorId(id);
  }

}

module.exports = new RecetasService();