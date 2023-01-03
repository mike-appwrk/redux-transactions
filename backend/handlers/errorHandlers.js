//I handle async errors
export const catchErrors = (fn) => {
  return function (req, res, next) {
    return fn(req, res, next).catch(next);
  }
};

export const notFound = (error, req, res, next) => {
  console.log(error)
  res.status(404);
  res.json({ done: error })
}
