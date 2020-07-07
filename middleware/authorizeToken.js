const jwt = require('jsonwebtoken');
const config = require('../utils/config');

// Helper function that receives request and strips the token 
// from the authorization header of the request.
const getTokenFromRequest = request => {
  const auth = request.get('authorization');

  if (auth && auth.toLowerCase().startsWith('bearer ')) {
    return auth.substring(7);
  }

  return null;
}

// Middleware function that authorizes user by getting the
// token and verifying it with the jwt.verify() method.
// If it the token and decodedToken id is present, then it 
// sets the user object on the request object.
const authorizeToken = (req, res, next) => {
  const token = getTokenFromRequest(req);
  const decodedToken = jwt.verify(token, config.SECRET);

  if (!token || !decodedToken.id) {
    res.status(403).json({ error: 'missing or invalid token' });
  }

  try {
    req.user = decodedToken;
    next();
  }
  catch(e) {
    res.status(401).json({ error: 'authorization denied' })
  }
}

module.exports = { authorizeToken };