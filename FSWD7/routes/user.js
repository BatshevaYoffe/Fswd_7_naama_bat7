const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '2424',
  database: 'project6',
});

// Get all users
router.get('/', (req,res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error('Error getting users: ', err);
      res.status(500).json({ error: 'Error getting users' });
      return;
    }
    res.json(results);
  });
});

// // Get a specific user by ID
// router.get('/:id', (req, res) => {
//   const userId = req.params.id;
//   db.query('SELECT * FROM users WHERE id = ?', [userId], (err, results) => {
//     if (err) {
//       console.error('Error retrieving user: ', err);
//       res.status(500).json({ error: 'Error retrieving user' });
//       return;
//     }
//     if (results.length === 0) {
//       res.status(404).json({ error: 'User not found' });
//       return;
//     }
//     const user = results[0];
//     res.json({ user });
//   });
// });

// Get a specific user by username
router.get('/:username', (req, res) => {
  const username = req.params.username;
  db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
    if (err) {
      console.error('Error retrieving user: ', err);
      res.status(500).json({ error: 'Error retrieving user' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: 'User not found???' });
      return;
    }
    const user = results[0];
    res.json({ user });
  });
});


// Create a new user
router.post('/', (req, res) => {
  const { name, username, email, address, phone } = req.body;
  db.query('INSERT INTO users (name, username, email, address, phone) VALUES (?, ?, ?, ?, ?)', [name, username, email, address, phone], (err, results) => {
    if (err) {
      console.error('Error creating user: ', err);
      res.status(500).json({ error: 'Error creating user' });
      return;
    }
    res.json({ message: 'User created successfully' });
  });
});


// Update a user
router.put('/:id', (req, res) => {
  const userId = req.params.id;
  const { name, username, email, address, phone } = req.body;
  db.query('UPDATE users SET name = ?, username = ?, email = ?, address = ?, phone = ? WHERE id = ?', [name, username, email, address, phone, userId], (err, results) => {
  if (err) {
    console.error('Error updating user: ', err);
    res.status(500).json({ error: 'Error updating user' });
    return;
  }
  res.json({ message: 'User updated successfully' });
  });
});

// Delete a user
router.delete('/:id', (req, res) => {
  const userId = req.params.id;
  db.query('DELETE FROM users WHERE id = ?', [userId], (err, results) => {
    if (err) {
      console.error('Error deleting user: ', err);
      res.status(500).json({ error: 'Error deleting user' });
      return;
    }
    res.json({ message: 'User deleted successfully' });
  });
});

module.exports = router;


