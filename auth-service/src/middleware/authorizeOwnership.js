const permissions = require('../config/permissions');
const User = require('../models/user.model');
 
const authorizeOwnership = ({ ownPermission, anyPermission, getResourceOwnerId }) => {
  return async (req, res, next) => {
    const role = req.user.role;
    const userpermissions = permissions[role];
    const resourceOwnerId = getResourceOwnerId(req);

    if (!userpermissions) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden'
      });
    }
    if (userpermissions.includes(anyPermission)) {
       
            
      return next();
    }
    if (userpermissions.includes(ownPermission)) {
        if (req.user.id === resourceOwnerId) {
          return next();
        }
    }

    return res.status(403).json({
      success: false,
      message: 'Forbidden'
    });
  };
};

module.exports = authorizeOwnership;