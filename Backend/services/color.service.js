const colorRepository = require('../repositories/color.repository');

class ColorService {

  async listar() {
    return await colorRepository.getAll();
  }

  async crear(color) {
    return await colorRepository.create(color);
  }

  async actualizar(id, color) {
    await colorRepository.update(id, color);
  }

}

module.exports = new ColorService();