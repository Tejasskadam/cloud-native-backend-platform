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
    

    return jwt.sign({id: user.id, email: user.email, role: user.role}, 
        privateKey, { algorithm: 'RS256', expiresIn: '15min' });
      

    
};

createRefreshToken = (user, tokenVersion) => {

    return jwt.sign(
        {id: user.id, tokenVersion: tokenVersion},
        privateKey,
        { algorithm: 'RS256', expiresIn: '7d' }
    );

}; 

const hashToken = (token) => 
     crypto.createHash('sha256').update(token).digest('hex');
    module.exports = {
    createAccessToken,
    createRefreshToken,
    hashToken   
};