const vendedorRepository = require('../repositories/vendedor.repository');

class VendedorrService {

  async listar() {
    return await vendedorRepository.getAll();
  }

  async crear(vendedor) {
    return await vendedorRepository.create(vendedor);
  }

  async actualizar(id, vendedor) {
    await vendedorRepository.update(id, vendedor);
  }

}

module.exports = new VendedorrService();