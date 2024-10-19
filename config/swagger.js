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
  components: {
    ...swaggerComponents, // Diğer bileşenlerinizi burada tutabilirsiniz
    securitySchemes: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT', // Opsiyonel, ama JWT kullanıldığını belirtir
        description:
          'Enter JWT token in the format: Bearer <token>',
      },
    },
  },
  security: [
    {
      BearerAuth: [],
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'], // API endpoint'lerinize ait dosyalar
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;