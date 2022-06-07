module.exports = app => {
  const swaggerUi = require('swagger-ui-express');
  const swaggerDocument = require('./swagger.json');
  app.use(
      '/',
      swaggerUi.serve,
      swaggerUi.setup(swaggerDocument)
  );
}