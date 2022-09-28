const sendErroeDev = (err, req, res) => {
  if (req.originalUrl.startsWith('/api')) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }
  return res.status(err.statusCode).render('error', {
    title: 'Something went wrong!',
    msg: err.message,
  });
};

const sendErroeProd = (err, req, res) => {
  // A) API
  if (req.originalUrl.startsWith('/api')) {
    // Operational and trusted error, send to client.
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }
    // Programming or other unkown error, dont send to client.
    else {
      console.error('Error 💥', err);

      return res.status(500).json({
        status: 'error',
        message: 'Something went wrong',
      });
    }
  }
  // B) RENDERD PAGES
  // A) Operational or trusted error.
  if (err.isOperational) {
    return res.status(err.statusCode).render('error', {
      title: 'Something went wrong!',
      msg: err.message,
    });
  }

  // B) Programming or other unkown errors.
  // 1) Log problem in console.
  console.error('Error', err);

  // Return generic error
  return res.status(err.statusCode).render('error', {
    title: 'Something went wrong!',
    msg: 'Please try again later',
  });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') sendErroeDev(err, req, res);
  else if (process.env.NODE_ENV === 'production') sendErroeProd(err, req, res);
};
