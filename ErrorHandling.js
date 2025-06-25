//7. Error Handling Middleware Write a global error handler that catches all errors, logs them, and returns appropriate JSON responses based on error type.

function globalErrorHandler(err, req, res, next) {
  console.error('Error:', err.message);

  let statusCode = 500;
  let message = 'Internal Server Error';

  
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = err.message || 'Validation Failed';
  } else if (err.name === 'UnauthorizedError') {
    statusCode = 401;
    message = 'Unauthorized Access';
  } else if (err.name === 'NotFoundError') {
    statusCode = 404;
    message = 'Resource Not Found';
  }

  res.status(statusCode).json({
    success: false,
    error: message
  });
}

module.exports = globalErrorHandler;
