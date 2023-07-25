import { useNavigate } from "react-router-dom";
import { useParams, useEffect, useState } from "react";
import { FaTrash, FaEdit, FaSave } from 'react-icons/fa';
function addNewBook(){
    const [isFieldEnabled, setIsFieldEnabled] = useState(false);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("currentUser")));
    const [newbook, setBook] = useState({
        book_name: "",
        author_name: "",
        title: "",
        publication_year: "",
        owner_code: user.id,
        availability: false,
        borrower_username: ""
      });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = "http://localhost:3000/book";
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newbook),
    };

    // fetch(url, requestOptions)
    //   .then((response) => {
    //     if (response.status === 200) {
    //       console.log(response);
    //       return response.json();
    //     } else
    //       // if (response.status === 409) {
    //       throw "Username or password already exists";
    //     //  }
    //   })
    //   .then((u) => {
    //     console.log(u);
    //     // localStorage.setItem("currentUser", JSON.stringify(user));
    //     // navigate(`/users/${user.username}/info`);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //     alert(error);
    //   });
  };

  return (
    <section className={styles.section}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h5>addBook</h5>
        <div className={styles["form-row"]}>
          <input
            type="text"
            placeholder="book_name"
            className={styles["form-input"]}
            id="book_name"
            value={newbook.book_name}
            onChange={(e) => setBook({ ...newbook, book_name: e.target.value })} // עדכון השדה של השם ב-user
          />
        </div>
        <div className={styles["form-row"]}>
          <input
            type="text"
            placeholder="author_name"
            className={styles["form-input"]}
            id="author_name"
            value={newbook.author_name}
            onChange={(e) => setBook({ ...newbook, author_name: e.target.value })} // עדכון השדה של השם ב-user
            disabled={isFieldEnabled}
          />
        </div>
        <div className={styles["form-row"]}>
          <input
            type="text"
            placeholder="title"
            className={styles["form-input"]}
            id="title"
            value={newbook.title}
            onChange={(e) => setBook({ ...newbook, title: e.target.value })} // עדכון השדה של השם ב-user
            disabled={isFieldEnabled}

          />
        </div>
        <div className={styles["form-row"]}>
          <input
            type="year"
            placeholder="publication_year"
            className={styles["form-input"]}
            id="publication_year"
            value={user.publication_year}
            onChange={(e) => setBook({ ...newbook, publication_year: e.target.value })} // עדכון השדה של השם ב-user
            disabled={isFieldEnabled}

          />
        </div>
        <div className={styles["form-row"]}>
          <input
            type="email"
            placeholder="email"
            className={styles["form-input"]}
            id="email"
            value={newbook.owner_code}
            onChange={(e) => setBook({ ...newbook, email: e.target.value })} // עדכון השדה של השם ב-user
            disabled={isFieldEnabled}

          />
        </div>
        
        <button type="submit" className={styles.btn}>
          ADD BOOK
        </button>
      </form>
    </section>
  );
}


export default addNewBook;