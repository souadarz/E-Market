
export const logger = (req, res, next) => {
  const currentDate = new Date(Date.now()).toLocaleString();
  console.log(req.method, req.path, currentDate);
  next(); 
};

export const notFound = (req, res, next) => {
  const error = new Error(`Not Found: ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
};


export const ErrorHandler = (err, req, res, next) => {
  console.log("Middleware Error Hadnling");
  const errStatus = err.statusCode || 500;
  const errMsg = err.message || 'Internal Server Error';
  res.status(errStatus).json({
      success: false,
      status: errStatus,
      message: errMsg,
      stack: process.env.NODE_ENV === 'development' ? err.stack : {}
  });
}