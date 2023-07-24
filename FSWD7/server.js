const express = require('express');

const cors = require('cors');

const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Enable CORS
app.use(cors());



// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const loginRoutes = require('./routes/login');
const userRoutes = require('./routes/user');
const infoRoutes=require('./routes/Info');
// const postRoutes = require('./routes/posts');
// const commentRoutes = require('./routes/comments');
// const todoRoutes = require('./routes/todos');
// const usersRRoutes = require('./routes/usersR');
// const albumsRoutes = require('./routes/albums');
// const photosRoutes = require('./routes/photos');
app.use('/login', loginRoutes);
app.use('/users', userRoutes);
app.use('/info',infoRoutes);
// app.use('/posts', postRoutes);
// app.use('/comments', commentRoutes);
// app.use('/todos', todoRoutes);
// app.use('/usersR', usersRRoutes);
// app.use('/albums', albumsRoutes);
// app.use('/photos', photosRoutes);


// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
    