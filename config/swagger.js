import swaggerJSDoc from 'swagger-jsdoc';
import swaggerComponents from './swaggerComponents.js';
import swaggerEndpoints from './swaggerEndpoints.js';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'MasterQR API',
    version: '1.0.0',
    description: 'MasterQR API with Swagger',
  },
  servers: [
    {
      url: 'http://localhost:5000',
    },
  ],
  components: {
    ...swaggerComponents,
    securitySchemes: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Enter JWT token in the format: Bearer <token>',
      },
    },
  },
  security: [
    {
      BearerAuth: [],
    },
  ],
  paths: swaggerEndpoints,
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
