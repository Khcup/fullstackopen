const express = require('express');
const blogRouter = express.Router();
const { Blog, User } = require('../models/index');
const middlevare = require('../utils/midddleware');
const { Op } = require('sequelize');


const blogFinder = async (req, res, next) => {
  try {
    req.blog = await Blog.findByPk(req.params.id);
    if (!req.blog) {
      throw { name: 'NotFound' }; // Throw a custom error when blog is not found
    }
    next();
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
    res.status(500).json({ error: 'Internal server error.' });
  }
};

// List all blogs

blogRouter.get('/api/blogs', async (req, res, next) => {
    const { search } = req.query; // Get the 'search' query parameter

    try {
        let blogs;
        const orderOption = [['likes', 'DESC']]; // Define the order option for sorting by 'likes' in descending order

        if (search) {
            // If 'search' parameter is provided, filter by title containing the keyword (case-insensitive)
            blogs = await Blog.findAll({
                where: {
                    [Op.or]: [
                        { title: { [Op.iLike]: `%${search}%` } }, // Case-insensitive title search
                        { author: { [Op.iLike]: `%${search}%` } }, // Case-insensitive author name search
                    ],
                },
                order: orderOption
            });
        } else {
            // If 'search' parameter is not provided, return all blogs
            blogs = await Blog.findAll();
        }

        res.json(blogs);
    } catch (error) {
        next(error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});


// Get a specific blog by ID
blogRouter.get('/api/blogs/:id', blogFinder, async (req, res, next) => {
  if (req.blog) {
    res.json(req.blog);
  } else {
    next({ name: 'NotFound' }); // Throw a custom error when blog is not found
    res.status(500).json({ error: 'Internal server error.' });

  }
});


// Delete a blog by ID
blogRouter.delete('/api/blogs/:id', middlevare.verifyToken, async (req, res, next) => {
    try {
      const blogId = req.params.id;
      const user = req.user; // Get the user from the token
  
      // Find the blog by ID
      const blog = await Blog.findByPk(blogId);
  
      if (!blog) {
        return res.status(404).json({ error: 'Blog not found' });
      }
  
      // Check if the user trying to delete the blog is the same user who added it
      console.log(user)
      if (user.name !== blog.author) {
        return res.status(403).json({ error: "You don't have permission to delete this blog" });
      }
  
      // Delete the blog
      await blog.destroy();
      res.status(204).end();
    } catch (error) {
      next(error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  });

// Update a blog's 'important' field by ID
blogRouter.put('/api/blogs/:id', blogFinder, async (req, res, next) => {
  if (req.blog) {
    req.blog.likes = req.body.likes;
    await req.blog.save();
    res.json(req.blog);
  } else {
    next({ name: 'NotFound' }); // Throw a custom error when blog is not found
  }
});

blogRouter.post('/api/blogs', middlevare.verifyToken, async (req, res, next) => {
    try {
        const { title, content, likes = 0, year, url } = req.body; // Set likes to 0 if not provided
        const user = req.user; // Get the user from the token verification middleware
        console.log(user.name)
  
      // Create a new blog associated with the current user
      const newBlog = await Blog.create({ title, content, likes, year, url, author: user.name });
  
      res.status(201).json(newBlog);
    } catch (error) {
      next(error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  });

module.exports = blogRouter;

