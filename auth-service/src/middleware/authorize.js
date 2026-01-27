const permissions = require('../config/permissions');

const authorize = (requiredPermission) => {
  return (req, res, next) => {
    const role = req.user.role;
    const allowedPermissions = permissions[role];

    if (!allowedPermissions || !allowedPermissions.includes(requiredPermission)) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden'
      });
    }
    next();
  };
};

module.exports = authorize;
