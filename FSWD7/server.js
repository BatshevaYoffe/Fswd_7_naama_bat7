// const express = require("express")
// const app = express()

// // app.use(express.static("public"))
// app.use(express.urlencoded({ extended: true }))
// app.use(express.json())

// // app.set("view engine", "ejs")

// const userRouter = require(`./routes/login`)

// app.use("/login", userRouter)

// app.listen(3000)

const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql2");

app.use(cors());
app.use(express.json());

const sqlPassword = "bat7Yoffe";


// Importing all the routes
// const homeroute=require("./routes/Home")
// const loginroute=require("./routes/login")
  
// // Creating express server
// const app=express()
  
// // Handling routes request
// app.use("/home",homeroute)
// app.use("/login",loginroute)
// app.listen((3000),()=>{
//     console.log("Server is Running")
// })
//login & register
app.post("/login", function (req, res) {
  const { name, password } = req.body;

  console.log(name);
  console.log(password);
  if (!name || !password) {
    res.status(400).send("Missing username or password");
    return;
  }

  const query = `SELECT * FROM password NATURAL JOIN users WHERE username = '${name}' LIMIT 1`;

  sqlConnect(query)
    .then((results) => {
      console.log(results);
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

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

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
