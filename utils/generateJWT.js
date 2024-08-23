const jwt = require('jsonwebtoken');

module.exports = async (payload) => {

    const token = await jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });//10m,10s,10d
    return token
} 
