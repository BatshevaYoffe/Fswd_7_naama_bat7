// const { sqlConnect } = require('./connectTodb');
// const {sqlConnect} = require('./connectTodb.js');
const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

const sqlPassword = "bat7Yoffe";

function sqlConnect(query, values = []) {
    return new Promise((resolve, reject) => {
      const connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: sqlPassword,
        database: "library_fswd7",
      });
  
      connection.connect((err) => {
        if (err) {
          console.error("Error connecting to MySQL server: " + err.stack);
          reject(err);
          return;
        }
        console.log("Connected to MySQL server");
  
        connection.query(query, values, (err, results) => {
          if (err) {
            console.error("Error executing query: " + err.code);
            reject(err);
          }
  
          connection.end((err) => {
            if (err) {
              console.error("Error closing connection: " + err.stack);
              // reject(err);
              return;
            }
            console.log("MySQL connection closed");
          });
  
          resolve(results);
        });
      });
    });
  }
  
router.post("/", function (req, res) {
    
  console.log('login router');
  const { name, password } = req.body;

  console.log(name);
  console.log(password);
  if (!name || !password) {
    res.status(400).send("Missing username or password");
    return;
  }

  const query = `SELECT * FROM users WHERE username = '${name}' LIMIT 1`;

  sqlConnect(query)
    .then((results) => {
      console.log(results[0]);
      console.log(results.length);
      if (results.length === 1 ){
      //&& results[0].password === password) {
        
        res.status(200).json(results[0]);
      } else {
        res.status(401).send("Wrong username or password");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("An error occurred");
    });
});

module.exports = router;

