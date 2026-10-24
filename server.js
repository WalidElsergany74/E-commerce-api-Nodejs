const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const dbConnection = require('./config/database');
const categoryRoute = require('./routes/categoryRoute');
const subcategoryRoute = require('./routes/subCategoryRoutes');
const brandRoute = require('./routes/brandRoute');
const AppError = require('./utils/appError');
const globalError = require('./middlewares/globalError');

dotenv.config({ path: '.env' });

// Connect to database
dbConnection();

// Express app
const app = express();

// Middlewares
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  console.log(`Mode: ${process.env.NODE_ENV}`);
}

// Mount Routes
app.use('/api/v1/categories', categoryRoute);
app.use('/api/v1/subcategorires', subcategoryRoute);
app.use('/api/v1/brands', brandRoute);

app.use((req, res, next) => {
  next(new AppError(`Can't find this URL: ${req.originalUrl}`, 400));
});

// Global Error Handling Middleware
app.use(globalError);

// Start server
const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, () => {
  console.log(`Your app listening on port ${PORT}`);
});

// Handle rejection errors outside express
process.on('unhandledRejection', (err) => {
  console.log(`ubhandledRejection : ${err.name} , ${err.message}`);
  server.close(() => {
    console.log('Shutting down...');
    process.exit(1);
  });
});
