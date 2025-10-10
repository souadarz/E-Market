import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

// Options de Swagger
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API E-Market",
      version: "1.0.0",
      description: "Documentation de l'API E-Market",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

// Génération de la documentation
const specs = swaggerJsdoc(options);

export const swaggerDocs = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  console.log("Swagger docs disponibles sur http://localhost:3000/api-docs");
};
