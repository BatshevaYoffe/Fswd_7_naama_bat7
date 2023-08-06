const {sqlConnect} = require('./connectTodb.js');
const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

//const sqlPassword = "324170521";

// function sqlConnect(query, values = []) {
//     return new Promise((resolve, reject) => {
//       const connection = mysql.createConnection({
//         host: "localhost",
//         user: "root",
//         password: sqlPassword,
//         database: "library_fswd7",
//       });
  
//       connection.connect((err) => {
//         if (err) {
//           console.error("Error connecting to MySQL server: " + err.stack);
//           reject(err);
//           return;
//         }
//         console.log("Connected to MySQL server");
  
//         connection.query(query, values, (err, results) => {
//           if (err) {
//             console.error("Error executing query: " + err.code);
//             reject(err);
//           }
  
//           connection.end((err) => {
//             if (err) {
//               console.error("Error closing connection: " + err.stack);
//               // reject(err);
//               return;
//             }
//             console.log("MySQL connection closed");
//           });
  
//           resolve(results);
//         });
//       });
//     });
//   }
  //get all books wish list of user
router.get(`/wishList/users/:userid`, function (req, res) {
    const userid=req.params.userid;
    const query= `SELECT books_borrowed.*, volumes.volume_id, volumes.owner_code, volumes.book_code, books.*
    FROM library_fswd7.books_borrowed
    INNER JOIN library_fswd7.volumes ON books_borrowed.volume_code = volumes.volume_id
    INNER JOIN library_fswd7.books ON volumes.book_code = books.id
    WHERE books_borrowed.user_code ='${userid}' AND books_borrowed.confirmation_date IS NULL `;
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

  //get all reading  list of user
  router.get(`/myReadingList/users/:userid`, function (req, res) {
    const userid=req.params.userid;
    const query= `SELECT books_borrowed.*, volumes.volume_id, volumes.owner_code, volumes.book_code, books.*
    FROM library_fswd7.books_borrowed
    INNER JOIN library_fswd7.volumes ON books_borrowed.volume_code = volumes.volume_id
    INNER JOIN library_fswd7.books ON volumes.book_code = books.id
    WHERE books_borrowed.user_code ='${userid}' 
    AND books_borrowed.confirmation_date IS NOT NULL
    AND books_borrowed.return_date IS NULL `;
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
//return book
router.put(`/myReadingList/users/:userid`, function (req, res) {
  const userid=req.params.userid;
  const reqBody=req.body;
  
  updateReturnDate(reqBody.request_id)
  .then((results) => {
    console.log(results);
    findTheNextReader(volume_id).then((res)=>{
      if(res.length === 0)
       updateVolumeStatus(volume_id)
      else {
        console.log("the res is")
        console.log(res[0].request_id)
        updateTheNextReader(res[0].request_id)
      }
    })
    res.status(200);
  })
  .catch((err) => {
      console.error(err);
      res.status(500).send("An error occurred");
  });
});



function updateReturnDate(requestId) {
  const query = `UPDATE  library_fswd7.books_borrowed SET return_date=NOW() WHERE request_id = '${requestId}' ;`

  return sqlConnect(query);
}
function findTheNextReader(volumeId){
  const query =`SELECT *
    FROM library_fswd7.books_borrowed
    WHERE volume_id = '${volumeId}
      AND confirmation_date IS NULL
      AND return_date IS NULL
    ORDER BY request_date ASC
    LIMIT 1;`
 return sqlConnect(query);
}
function updateVolumeStatus(volumeId){
  const query =`UPDATE library_fswd7.volumes SET availability = 0 WHERE volume_id = '${volumeId}';`
  return sqlConnect(query);
}
function updateTheNextReader(requestId){
  const query = `UPDATE  library_fswd7.books_borrowed SET confirmation_date=NOW() WHERE request_id = '${requestId}' ;`

  return sqlConnect(query);
}
module.exports = router;