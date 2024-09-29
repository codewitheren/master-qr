// MasterQR API

import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';

import swaggerSpec from './config/swagger.js';
import connectDB from './config/db.js';

import userRoutes from './routes/userRoutes.js';

import { errorHandler } from './middlewares/errorHandler.js';

dotenv.config();

const app = express();

connectDB().then(() => {
  // Middleware
  app.use(express.json());
  app.use(morgan('dev'));

  // Routes
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.use('/api/v1/users', userRoutes);

  // Error handler
  app.use(errorHandler);

  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  });
});
