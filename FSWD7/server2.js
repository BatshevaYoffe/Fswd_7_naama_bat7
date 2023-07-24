const express = require('express');

const cors = require('cors');

const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Enable CORS
app.use(cors());

// Database connection
const db = mysql.createConnection({
host: 'localhost',
user: 'root',
password: '2424',
database: 'project6',
});

db.connect((err) => {
if (err) {
    console.error('Error connecting to the database: ', err);
    return;
}
console.log('Connected to the database');
});

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const userRoutes = require('./routes/users');
const postRoutes = require('./routes/posts');
const commentRoutes = require('./routes/comments');
const todoRoutes = require('./routes/todos');
const usersRRoutes = require('./routes/usersR');
const albumsRoutes = require('./routes/albums');
const photosRoutes = require('./routes/photos');
app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);
app.use('/todos', todoRoutes);
app.use('/usersR', usersRRoutes);
app.use('/albums', albumsRoutes);
app.use('/photos', photosRoutes);


// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
    