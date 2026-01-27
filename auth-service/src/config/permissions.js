const permissions = {
  user: [
    'read_own_profile',
    'update_own_profile'
  ],
  admin: [
    'read_own_profile',
    'update_own_profile',
    'read_any_profile',
    'update_any_profile',
    'delete_user'
  ]
};

module.exports = permissions;
