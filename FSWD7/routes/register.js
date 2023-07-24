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

// register
router.post("/", function (req, res) {
  const { username, password,first_name,last_name,email,phone,address,age } = req.body;
  const que = `SELECT * FROM users WHERE username = '${username}'`;
  sqlConnect(que)
    .then((result) => {
      if (result.length > 0) {
        console.log("you are exist");
        return res.status(202);
      }
      const addUser = `INSERT INTO users ( username,first_name,last_name,email,phone,address,age) VALUES ('${username}', '${first_name}', '${last_name}','${email}', '${phone}','${address}','${age}' )`;
      console.log(addUser);
      sqlConnect(addUser)
        .then((results) => {
          const addToPass = `INSERT INTO password (username,password) VALUES ('${username}','${password}')`;
          sqlConnect(addToPass) 
          .then((result) => {
            console.log("You are in the database");
            return res.status(200);

          })
          .catch((err) => {
            console.error(err);
            res.status(500).send("An error occurred");
          });
        })
        .catch((err) => {
          console.error(err);
          res.status(500).send("An error occurred");
        });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("An error occurred");
    });
});
module.exports = router;
