const User = require('../models/user.model');

const getProfile = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: req.user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
        return res.status(404).json({
        success: false,
        message: 'User not found'
        });
    }
    res.status(200).json({
      success: true,
      data: user
    });
  }
    catch (error) { 
    res.status(500).json({
        success: false,
        message: 'Server Error'
    });
    }
};
 module.exports = { getProfile, getUserById };