// server.js
const express = require('express');
const app = express();
const cors = require('cors');
const blogRouter = require('./controllers/Blogs')
const userRouter = require('/controllers/Users')
const authorRouter = require('./controllers/Author')
const readingListRouter = require('./controllers/ReadingList')
const { connectToDatabase } = require('./utils/db')
const midddleware = require('/utils/midddleware')


// Middleware
app.use(express.json());

app.use(blogRouter);
app.use(userRouter);
app.use(authorRouter);
app.use(readingListRouter);
app.use(cors());


app.use(midddleware.errorHandler)



// Start the server
const PORT = process.env.PORT || 3000;



const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()