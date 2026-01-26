const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

let publicKey;

try {
  publicKey = fs.readFileSync(path.join(__dirname, '../../public.key'), 'utf-8');
} catch (error) {
  console.error('Failed to read public key:', error.message);
  process.exit(1);
}
try {
    privateKey = fs.readFileSync(path.join(__dirname, '../../private.key'), 'utf-8');
} catch (error) {
    console.error('Failed to read private key:', error.message);
    process.exit(1);
}

createAccessToken = (user) => {

    return jwt.sign({id: user._id, role: user.role, tokenVersion: user.tokenVersion}, 
        privateKey, { algorithm: 'RS256', expiresIn: '15min' });
    
};

createRefreshToken = (user) => {

    return jwt.sign(
        {id: user._id, tokenVersion: user.tokenVersion},
        privateKey,
        { algorithm: 'RS256', expiresIn: '7d' }
    );

}; 

const hashToken = (token) => crypto.createHash('sha256').update(token).digest('hex');


module.exports = {
    createAccessToken,
    createRefreshToken,
    hashToken   
};