const { sqlConnect } = require('./connectTodb.js');
const bcrypt = require('bcryptjs'); //npm install bcryptjs

// const { newPassword, findUserId } = require('./help.js');

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
      sqlConnect(addUser)
        .then((results) => {
          // console.log(results[0]);
          findUserId(username)
            .then((res) => {
              console.log(res[0].id);
              console.log(password);
              // newPassword(res[0].id, password).then((console.log("new user")))
              newPassword(res[0].id, password).then(() => {console.log('new user'); res.status(200).json(username);});
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
      // res.status(200).json(username);//למה זה כאן?
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("An error occurred");
    });
});


function findUserId(username) {
  const userid = `SELECT id FROM users WHERE username = '${username}'`;

  return sqlConnect(userid);
}


// function newPassword(user_id, password) {
//   const addToPass = `INSERT INTO passwords (user_id,password) VALUES ('${user_id}','${password}')`;
//   return sqlConnect(addToPass);
// }

function newPassword(user_id, password) {
  return hashPassword(passwordToHash).then((hash) => {
    const addToPass = `INSERT INTO passwords (user_id,password) VALUES ('${user_id}','${hash}')`;
    sqlConnect(addToPass);
  });
}

async function hashPassword(plainPassword) {
  const saltRounds = 10;
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(plainPassword, salt);
    return hash;
  } catch (error) {
    throw error;
  }
}
module.exports = router;
