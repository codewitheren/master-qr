// MasterQR API

import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';

import swaggerSpec from './config/swagger.js';
import connectDB from './config/db.js';

import userRoutes from './routes/userRoutes.js';
import qrRoutes from './routes/qrRoutes.js';

import { errorHandler } from './middlewares/errorHandler.js';

dotenv.config();

const app = express();

connectDB().then(() => {
  // Middleware
  app.use(express.json());
  app.use(
    morgan(':method :url :status :res[content-length] - :response-time ms')
  );

  // Routes
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.use('/api/v1/users', userRoutes);
  app.use('/api/v1/qrs', qrRoutes);

  // Error handler
  app.use(errorHandler);

  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(
      `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
    );
  });
});
