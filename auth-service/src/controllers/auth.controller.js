const bcrypt = require('bcrypt');
const { createAccessToken, createRefreshToken, hashToken } = require('../utils/token');
const User = require('../models/user.model');

const register = async (req, res, next) => {
try {
    const { email , password, role } = req.body;
    console.log('Received body:', req.body);

    if (!email || !password || !role) {
        return res.status(400).json({ message: 'Email, password, and role are required' });
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(409).json({ message: 'User already exists' });
    }
    
    const encpass = await bcrypt.hash(password, 10);
    await User.create({ email, password: encpass, role });
    res.status(201).json({ message: `User ${email} registered successfully for role ${role}` });
    
} catch (error) {
    next(error);

}
};



const login = async (req, res, next) => {
try {
    const { email , password} = req.body; 
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    const userDetails = await User.findOne({ email });
    if (!userDetails) {
        return res.status(401).json({ message: 'Invalid User' });
    }
 ;
    const match = await bcrypt.compare(password, userDetails.password);
    if (!match) {
        return res.status(401).json({ message: 'Invalid Password' });
    }

    

    const accessToken = createAccessToken(userDetails);
    const refreshToken = createRefreshToken(userDetails);

    userDetails.refreshToken = hashToken(refreshToken);
    await userDetails.save();

    res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    sameSite: 'Strict',
    
    });

  res.status(200).json({
  message: 'User logged in successfully',
  accessToken
});
} catch (error) {
    next(error);
}
};

const logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(204);

  const user = await User.findOne({
    refreshToken: hashToken(refreshToken)
  });

  if (user) {
    user.refreshToken = null;
    user.tokenVersion += 1; // 🔥 GLOBAL LOGOUT
    await user.save();
  }

  res.clearCookie('refreshToken');
  res.json({ message: 'Logged out everywhere' });
};

module.exports = {
    register,
    login,
    logout
};