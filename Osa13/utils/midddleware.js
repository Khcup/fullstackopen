const User = require('../models/index')

const { SECRET } = require('/config.js')
const jwt = require('jsonwebtoken')


const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
    } catch{
      return res.status(401).json({ error: 'token invalid' })
    }
  } else {
    return res.status(401).json({ error: 'token missing' })
  }
  next()
}

const errorHandler = (error, req, res, next) => {
    console.error(error.message);
  
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
  
    if (error.name === 'CastError' && error.kind === 'ObjectId') {
      return res.status(400).json({ error: 'Malformatted id' });
    }
  
    if (error.name === 'NotFound') {
      return res.status(404).json({ error: 'Not found' });
    }
  
    if (error.name === 'UnauthorizedError') {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  
    if (error.name === 'ForbiddenError') {
      return res.status(403).json({ error: 'Forbidden' });
    }
  
    if (error.name === 'Conflict') {
      return res.status(409).json({ error: error.message });
    }

    if (error.name === 'SequelizeValidationError') {
      const errorMessages = error.errors.map((e) => e.message);
      return res.status(400).json({ error: errorMessages });
    }
  
    next(error);
  };


  const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) return res.status(401).json({ error: 'Access denied. No token provided' });
  
    if (!authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Invalid token format' });
    }
  
    const token = authHeader.substring(7);
  
    try {
      const decoded = jwt.verify(token, SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: 'Invalid token' });
    }
  };
  

const isAdmin = async (req, res, next) => {
    const user = await User.findByPk(req.decodedToken.id)
    if (!user.admin) {
      return res.status(401).json({ error: 'operation not allowed' })
    }
    next()
  }

module.exports = {
    verifyToken,
    errorHandler,
    tokenExtractor,
    isAdmin
  };
  
  