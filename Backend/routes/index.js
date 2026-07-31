module.exports = (app) => {

  app.use('/api', require('./login.routes'));
  app.use('/api', require('./productos.routes'));
  app.use('/api', require('./naturaleza.routes'));
  app.use('/api', require('./linea.routes'));
  app.use('/api', require('./sublinea.routes'));
  app.use('/api', require('./unidadmedida.routes'));
  app.use('/api', require('./proveedores.routes'));
  app.use('/api', require('./clientes.routes'));
  app.use('/api', require('./condicion.routes'));
  app.use('/api', require('./vendedor.routes'));
  app.use('/api', require('./concepto.routes'));
  app.use('/api', require('./almacenes.routes'));
  app.use('/api', require('./empresa_transporte.routes'));
  app.use('/api', require('./transportista.routes'));
  app.use('/api', require('./tipocambio.routes'));
  app.use('/api', require('./documentos.routes'));
  app.use('/api', require('./series.routes'));
  app.use('/api', require('./ubigeo.routes'));
  app.use('/api', require('./ingresos.routes'));
  app.use('/api', require('./color.routes'));
  // Archivo tablas.routes
  app.use('/api', require('./tablas.routes'));

};