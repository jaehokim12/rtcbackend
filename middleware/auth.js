const jwt = require('jsonwebtoken');

const config = process.env;
const verifyToken = (req, res, next) => {
  let token = req.body.token || req.query.token || req.headers['authorization'];
  if (!token) {
    return res.status(403).send('A token is required for authentication');
  }
  try {
    token = token.replace(/^Bearer\s+/, '');
    console.log('token', token);
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    console.log('decode', decoded);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send('Invalid token');
  }
  return next();
};
module.exports = verifyToken;
