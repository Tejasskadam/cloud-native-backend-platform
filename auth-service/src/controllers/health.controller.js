exports.healthCheck = (req, res) => {
  res.json({ status: 'UP' });
};
