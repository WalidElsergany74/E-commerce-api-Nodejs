
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const dbConnection = require('./config/database');
const categoryRoute = require('./routes/categoryRoute');
const AppError = require('./utils/appError');
const globalError = require('./middlewares/globalError')

dotenv.config({ path: 'config.env' });

// Connect to database
dbConnection()

// Express app
const app = express();

// Middlewares
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  console.log(`Mode: ${process.env.NODE_ENV}`);
}

// Mount Routes
app.use('/api/v1/categories' , categoryRoute)


app.use((req, res, next) => {
    next(new AppError(`Can't find this URL: ${req.originalUrl}` , 400));
});

// Global Error Handling Middleware
app.use(globalError);


// Start server
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Your app listening on port ${PORT}`);
});
