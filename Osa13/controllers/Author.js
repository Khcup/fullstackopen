const express = require('express');
const authorRouter = express.Router();
const { sequelize } = require('../utils/db');
const { QueryTypes } = require('sequelize');
const midddleware = require('../utils/midddleware')


// Define the /api/authors route
authorRouter.get('/api/authors', async (req, res, next) => {
  try {
    const authorsStats = await sequelize.query(
      `
      SELECT
        "author" AS "author",
        COUNT(*) AS "blogCount",
        SUM("likes") AS "totalLikes"
      FROM "blogs"
      GROUP BY "author"
      `,
      {
        type: QueryTypes.SELECT,
      }
    );

    res.json(authorsStats);
  } catch (error) {
    next(error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

  
authorRouter.put('/:username', midddleware.tokenExtractor, midddleware.isAdmin, async (req, res) => {
  try {

    const user = await User.findOne({
      where: {
        username: req.params.username
      }
    })
  
    if (user) {
      user.disabled = req.body.disabled
      await user.save()
      res.json(user)
    } else {
      res.status(404).end()
    }
  } catch (error) {
    next(error);
    res.status(500).json({ error: 'Internal server error.' });
  }
  })
module.exports = authorRouter;
