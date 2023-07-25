// const { sqlConnect } = require('./connectTodb');
// const {sqlConnect} = require('./connectTodb.js');
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
app.get(`/users/:userid`, function (req, res) {
    const userid=req.params.userid;
    const query=`SELECT
    books_borrowed.request_id,
    books_borrowed.request_date,
    books_borrowed.confirmation_date,
    books_borrowed.return_date,
    books_borrowed.user_code,
    volumes.owner_code,
    volumes.book_code,
  FROM
    books_borrowed
  INNER JOIN
    volumes
  ON
    books_borrowed.volume_code = volumes.volume_id
  WHERE
    volumes.owner_code = ${userid}`;
    sqlConnect(query)
    .then((results) => {
      console.log(results);
      res.status(200).json(results)
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send("An error occurred");
    });
});