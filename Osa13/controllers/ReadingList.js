const express = require('express');
const readingListRouter = express.Router();
const { User, Blog, ReadingList } = require('../models/index');



// Import your database models (e.g., Blog, User, ReadingList)

// Define a route to add a blog to the reading list
readingListRouter.post('/api/readinglists', async (req, res) => {
  try {
    const { userId, blogId } = req.body; // Assuming userId and blogId are sent in the request body

    // Check if the user and blog exist
    const user = await User.findByPk(userId);
    const blog = await Blog.findByPk(blogId);

    if (!user || !blog) {
      return res.status(404).json({ error: 'User or blog not found' });
    }

    // Add the blog to the reading list (you need to define your ReadingList model)
    await ReadingList.create({
      userId,
      blogId,
      unread: true, // Assuming you have a field to track the unread state
    });

    res.status(201).json({ message: 'Blog added to reading list' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



readingListRouter.put('/api/readinglists/:id', async (req, res) => {
  const { id } = req.params; // Get the blog ID from the URL parameters
  const { read } = req.body; // Get the "read" value from the request body
  const userId = req.user.id; // Get the user's ID from the token

  try {
    const readingListEntry = await ReadingList.findOne({
      where: { id, userId },
    });

    if (!readingListEntry) {
      return res.status(404).json({ error: 'Reading list entry not found.' });
    }

    // Ensure that the user can only mark their own blog as read
    if (readingListEntry.userId !== userId) {
      return res.status(403).json({ error: 'Access denied.' });
    }

    // Update the reading list entry to mark the blog as read
    readingListEntry.isRead = read;
    await readingListEntry.save();

    res.status(200).json({ message: 'Blog marked as read.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});



module.exports = readingListRouter;
