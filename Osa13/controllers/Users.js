const express = require('express');
const userRouter = express.Router();
const { User, Blog, ReadingList, Session } = require('../models/index');
const jwt = require('jsonwebtoken')
const config = require('/utils/config')
const midddleware = require('../utils/midddleware')

userRouter.post('/api/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    if (password !== 'secret') {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    if (user.disabled) {
      return response.status(401).json({
        error: 'Account disabled, please contact admin'
      });
    }

    const token = jwt.sign(
      { userId: user.id, username: user.username, name: user.name },
      config.SECRET,
      {
        expiresIn: '3h', // Token expiration time (adjust as needed)
      }
    );

    await Session.create({ token, userId: user.id });

    res.status(200).json({ token });
  } catch (error) {
    // Handle any errors that occur during the login process
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



  
userRouter.delete('/api/logout',midddleware.verifyToken , async (req, res) => {
  try {
    const  userId  = req.user.userId; // Replace with your method of user identification

    const removedSession = await Session.destroy({
    where: { userId },
    });

    if (removedSession) {
    return res.status(200).json({ message: 'Logged out successfully.' });
    } else {
    return res.status(404).json({ error: 'No active session found.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
  
  

// POST api/users (adding a new user)
userRouter.post('/api/users', async (req, res, next) => {
  try {
    const { username, name, admin, disabled } = req.body;
    const user = await User.create({ username, name, admin, disabled });
    res.status(201).json(user);
  } catch (error) {
    next(error);
    res.status(500).json({ error: 'Internal server error.' });

  }
});

// GET api/users (listing all users)
userRouter.get('/api/users', async (req, res, next) => {
    try {
      const users = await User.findAll({
        include: Blog, // Include the associated Blog model
      });
  
      res.json(users);
    } catch (error) {
      next(error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  });



  userRouter.get('/api/users/:id', async (req, res) => {
    const userId = req.params.id;
    const readParam = req.query.read;
  
    try {
      const user = await User.findByPk(userId, {
        include: [
          {
            model: Blog,
            as: 'readings',
            attributes: ['id', 'url', 'title', 'author', 'likes', 'year'],
            through: {
              attributes: ['read', 'blogId'], // You can specify the attributes of the connecting table here
            },
          },
        ],
      });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Filter the associated blogs based on the 'read' query parameter
      const filteredReadings = user.readings.filter((blog) => {
        if (readParam === undefined) {
          return true; // Return all blogs if 'read' query parameter is not provided
        }
        const isRead = blog.read;
        return (readParam === 'true' && isRead) || (readParam === 'false' && !isRead);
      });

      console.log(user.readings)
      // Create a response object
      const responseUser = {
        id: user.id,
        username: user.username,
        name: user.name,
        admin: user.admin,
        disabled: user.disabled,
        readings: filteredReadings,
      };
  
      res.json(responseUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  


// PUT api/users/:username (changing a username)
userRouter.put('/api/users/:username', async (req, res, next) => {
  try {
    const { username } = req.params;
    const updatedUser = await User.update(
      { username: req.body.username },
      {
        where: { username },
        returning: true,
      }
    );

    if (updatedUser[0] === 1) {
      res.json(updatedUser[1][0]);
    } else {
      res.status(404).end();
    }
  } catch (error) {
    next(error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

module.exports = userRouter;



