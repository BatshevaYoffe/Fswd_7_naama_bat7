const {sqlConnect} = require('./connectTodb.js');
const express = require('express');
const router = express.Router();
  
router.post("/", function (req, res) {
    
  console.log('login router');
  const { name, password } = req.body;

  console.log(name);
  console.log(password);
  if (!name || !password) {
    res.status(400).send("Missing username or password");
    return;
  }

  const query=`SELECT * FROM users u inner JOIN passwords p on u.id = p.user_id WHERE username ='${name}'  LIMIT 1
`
  // const query = `SELECT * FROM users NATURAL JOIN passwords WHERE username = '${name}' LIMIT 1`;

  sqlConnect(query)
    .then((results) => {
      console.log(results[0]);
      console.log(results.length);
      if (results.length === 1 && results[0].password === password) {
        
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

