const { sqlConnect } = require('./connectTodb.js');
const { newPassword, findUserId } = require('./help.js');

const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

const sqlPassword = "bat7Yoffe";

// register
router.post("/", function (req, res) {
  const { username, password, first_name, last_name, email, phone, address, age } = req.body;
  const que = `SELECT * FROM users WHERE username = '${username}'`;
  sqlConnect(que)
    .then((result) => {
      if (result.length > 0) {
        console.log("you are exist");
        return res.status(202);
      }
      const addUser = `INSERT INTO users ( username,first_name,last_name,email,phone,address,age) VALUES ('${username}', '${first_name}', '${last_name}','${email}', '${phone}','${address}','${age}' )`;
      // console.log(addUser);
      sqlConnect(addUser)
        .then((results) => {
          findUserId(username)
            .then((res) => {
              newPassword(res[0].id, password);
            })
            .catch(() => {
              console.error(err);
              res.status(500).send("An error occurred");
            })
        })
        .catch((err) => {
          console.error(err);
          res.status(500).send("An error occurred");
        });
      res.status(200).json(username);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("An error occurred");
    });
});
module.exports = router;