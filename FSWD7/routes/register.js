// register
app.post("/register", function (req, res) {
    debugger;
    const { name, phone, email, website, userName, password } = req.body;
  
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
  
      const que = `SELECT * FROM users WHERE username = '${userName}'`;
      console.log(que);
      con.query(que, (err, result) => {
        if (err) {
          console.log("Error executing the query:", err);
          return;
        }
  
        else if (result.length > 0) {
          console.log("you are exist");
          return res.status(202).send("You are already registered");
        }
  
        
  
          const addUser = `INSERT INTO users ( name, username, email, phone, website) VALUES ('${name}', '${userName}', '${email}', '${phone}', '${website}')`;
          console.log(addUser);
          con.query(addUser, (err, result) => {
            if (err) {
              console.log("Error executing the query:", err);
            }
            const addToPass=`INSERT INTO passwords (username,password) VALUES ('${userName}','${password}')`;
            con.query(addToPass, (err, result) => {
              if (err) {
                console.log("Error executing the query:", err);
              }
              console.log("You are in the database");
              return res.status(200).send("You are in the database");
  
          });
          con.end();
        });
      });
    });
  });