exports.healthCheck = (req, res, next) => {
  res.status(200).json({ status: 'UP' });
  next();
};
