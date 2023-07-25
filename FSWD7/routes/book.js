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

router.post("/", function (req, res) {
    const book = req.body;
    const book_id = `SELECT book_id FROM books WHERE book_name = '${book.book_name}'`;
    sqlConnect(book_id)
        .then((result) => {
            if (result.length > 0) {//הספר קיים-> נוסיף כרך 
                console.log("the book exist");

                const addVolumeQuery = `INSERT INTO volumes (book_id, owner_code) VALUES '${book_id}', '${book.owner_code}'`;
                sqlConnect(addVolumeQuery)
                    .then((result) => {
                        return result.status(202);
                    })
            }
            //הספר לר קיים->נוסיף ספר וגם כרך
            const addBook = `INSERT INTO book ( book_name,author_name,publication_year) VALUES ('${book_name}', '${author_name}','${publication_year}' )`;
            console.log(addBook);
            sqlConnect(addBook)
                .then((results) => {
                    book_id = `SELECT book_id FROM books WHERE book_name = '${book.book_name}'`;

                    const addToPass = `INSERT INTO password (username,password) VALUES ('${username}','${password}')`;
                    sqlConnect(addToPass)
                        .then((result) => {

                            sqlConnect(book_id)
                                .then((result) => {
                                    if (result.length > 0) {//הספר קיים-> נוסיף כרך 
                                        console.log("the book exist");

                                        const addVolumeQuery = `INSERT INTO volumes (book_id, owner_code) VALUES '${book_id}', '${book.owner_code}'`;
                                        sqlConnect(addVolumeQuery)
                                            .then((result) => {
                                                return result.status(202);
                                            })
                                    }

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
});

//בודק האם הספר קיים ומחזיר אותו אם כן
router.get("/", function (req, res) {
    const bookName = req.query.postId;

    const query = `SELECT * FROM books WHERE book_name = ${bookName}`;

    sqlConnect(query)
        .then((results) => {
            res.status(200).json(results);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send("An error occurred");
        });
});

//למחוק ספר
router.delete("/:id", function (req, res) {
    const bookId = req.params.id;

    let query = `DELETE FROM books WHERE id = ${bookId}`;
    sqlConnect(query)
        .then(() => {
            res.status(200).json({ message: "book deleted successfully" });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send("An error occurred");
        });

});

module.exports = router;