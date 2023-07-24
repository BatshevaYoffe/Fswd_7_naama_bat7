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
    
  
router.put("/:userId", function (req, res) {
    const {userId}=req.params;
    const {fisrt_name,last_name,username,email,phone,address,age}=req.body;
    console.log(userId);
    const query = `UPDATE users SET first_name = '${fisrt_name}' ,  last_name = '${last_name}' ,username = '${username}',phone = '${phone}',email = '${email}',address = '${address}',age = '${age}' WHERE id = ${userId}`;
    console.log(query)
    sqlConnect(query)
    .then((results) => {
      console.log("the comment updated");
      res.status(200).send("the user info updated");
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send("An error occurred");
    });
    
})
    

    


module.exports = router;