const ingresosRepository = require('../repositories/ingresos.repository');

class IngresosService {
  async create(documento) {
    if (!documento.detalles?.length) {
      throw new Error('Debe registrar al menos un producto en el detalle');
    }
    return await ingresosRepository.create(documento);
  }

  async update(id, documento) {
    if (!documento.detalles?.length) {
      throw new Error(
        'Debe registrar al menos un producto en el detalle'
      );
    }
    return await ingresosRepository.update(
      id,
      documento
    );
  }

  async obtenerSerie() {
    return await ingresosRepository.obtenerSerie();
  }

  async listar(mes, anio, texto) {
    return await ingresosRepository.listar(mes, anio, texto);
  }

  async obtenerPorId(id) {
    return await ingresosRepository.obtenerPorId(id);
  }

  async listarTipoOperacion() {
    return await ingresosRepository.listarTipoOperacion();
  }
}

module.exports = new IngresosService();