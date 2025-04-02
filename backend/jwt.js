const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware to check token
const jwtMiddleware = (req, res, next) => {
  // Check if the Authorization header exists
  const authorization = req.headers.authorization;

  if (!authorization) return res.status(401).json({ error: 'Token Not Found' });

  // Extract the token from the Authorization header
  const token = authorization.split(' ')[1];

  // Check if the token was properly extracted
  if (!token) return res.status(401).json({ error: 'Unauthorized, Token Missing' });

  try {
    // Verify the token using the secret
    const decodedData = jwt.verify(token, process.env.JWT_Secret);

    // Attach the verified token's data to the request object
    req.user = decodedData;

    next(); // Call the next middleware or route handler
  } catch (err) {
    console.error('JWT Verification Error:', err);
    res.status(403).json({ error: 'Forbidden, Invalid Token' });
  }
};


const generatetoken = (userData)=>{
    //token generate
    return jwt.sign(userData,process.env.JWT_Secret,{expiresIn:'1h'})
}


module.exports={jwtMiddleware,generatetoken}