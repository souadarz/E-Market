
export const logger = (req, res, next) => {
  const currentDate = new Date(Date.now()).toLocaleString();
  console.log(req.method, req.path, currentDate);
  next(); 
};
