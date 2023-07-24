const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

const sqlPassword = "324170521";

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
  

// Define your info route logic here
router.put('/', (req, res) => {
  const postid=req.params.postid;
  console.log(postid)

  const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "324170521", // your password here
    port: 3306,
    database: "FullStackProject6", // remove comment after first run
  });

  con.connect(function (err) {
    if (err) {
      console.error("Error connecting to database:", err);
      return;
    }
    console.log("Connected to database!");

    const que = `SELECT * FROM comments WHERE postId = '${postid}'`;
    console.log(que);
    con.query(que, (err, result) => {
      if (err) {
        console.log("Error executing the query:", err);
        return;
      }
      console.log(result.length)
      res.status(200).json(result)

        con.end();
      });
    });
});

module.exports = router;