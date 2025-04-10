const musicaController = require("./musicaController");

module.exports = (app) => {
  app.post('/musica', musicaController.post);
  app.put('/musica/:id', musicaController.put);
  app.delete('/musica/:id', musicaController.delete);
  app.get('/musica', musicaController.get);
  app.get('/musica/:id', musicaController.getById);
  app.post('/musica/criartabela', musicaController.createTable);
};