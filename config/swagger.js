import swaggerJSDoc from 'swagger-jsdoc';
import swaggerComponents from './swaggerComponents.js';

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
  components: swaggerComponents,
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;