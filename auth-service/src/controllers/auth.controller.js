const fs = require('fs');
const bcrypt = require('bcrypt');
const { createAccessToken, createRefreshToken } = require('../utils/token');

const register = async (req, res, next) => {
try {
    const { email , password, role } = req.body;
    console.log('Received body:', req.body);

    if (!email || !password || !role) {
        return res.status(400).json({ message: 'Email, password, and role are required' });
    }
    const id = Math.floor(Math.random() * 10002);
    const encpass = await bcrypt.hashSync(password, 10);
    fs.writeFileSync('users.txt', `ID: ${id}, Email: ${email}, Role: ${role}, Password: ${encpass}\n`, { flag: 'a' });
    res.status(201).json({ message: `User ${email} id : ${id} registered successfully for role ${role}` });
    
} catch (error) {
    next(error);

}
};

const generateToken = require('../utils/generateToken');

const login = async (req, res, next) => {
try {
    const { id , password} = req.body; 
    if (!id || !password) {
        return res.status(400).json({ message: 'ID and password are required' });
    }
    const data = fs.readFileSync('users.txt', 'utf-8');
    const userLine = data.split('\n')
  .find(line => line.startsWith(`ID: ${id},`));

    if (!userLine) {
    return res.status(401).json({ message: 'Invalid User' });
    }

    
    
    if (userLine) {
        const storedPassword = userLine.split(',')[3].trim().split(':')[1].trim();
        const dcrpass = await bcrypt.compareSync(password, storedPassword);
        if (!dcrpass) {
            return res.status(401).json({ message: 'Invalid Password' });
        }
    }

      
    const email = userLine?.split(',')[1]?.trim().split(':')[1]?.trim();   
    const role = userLine?.split(',')[2]?.trim().split(':')[1]?.trim();
    const user = { id: id, email: email, role: role };
    const accessToken = createAccessToken(user);
    const refreshToken = createRefreshToken(user, 0);

    res.cookie('refreshToken', refreshToken, {
    httpOnly: true
    });

    res.status(200).json({
  message: 'User logged in successfully',
  accessToken
});
} catch (error) {
    next(error);
}
};

module.exports = {
    register,
    login
};