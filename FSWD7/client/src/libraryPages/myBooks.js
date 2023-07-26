import { useNavigate } from "react-router-dom";
import { useParams, useEffect, useState, version } from "react";
import { FaTrash, FaEdit, FaSave } from 'react-icons/fa';
import styles from "./Info.module.css";
import React from "react";
function MyBooks(){
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const [myBooks,setMyBooks]= useState([]);
    const [findMyBooks, setFindMyBooks] = useState(true);
    const [currentVolume,setCurrentVolume]=useState(-1);
    const [currentReader,setCurrentReader]=useState(null)



    useEffect(()=>{
        debugger
    const myBooksFromLocal = JSON.parse(localStorage.getItem('myBooksList'));
    if (Array.isArray(myBooksFromLocal)) {
      setMyBooks(myBooksFromLocal);
      setFindMyBooks(true);
    } else {
      const url = `http://localhost:3000/myBooks/users/${user.id}`;

      const requestMyBooks = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };

      fetch(url, requestMyBooks)
        .then((response) => response.json())
        .then((data) => {
          const sortedBooks = [...data].sort((a, b) => a.id - b.id);
          setMyBooks(sortedBooks);
          localStorage.setItem('myBooksList', JSON.stringify(sortedBooks));
        })
        .catch(() => setFindMyBooks(false));
    }
    },[])

    const deleteBook  = (volume_id) => {

    }
    const showReader = (volume_id) =>{
        if(currentVolume === volume_id){
            setCurrentVolume(-1); 
            setCurrentReader(null) ;  
        }
        else{
            setCurrentVolume(volume_id);
            const readerForVolumeFromLocal = JSON.parse(localStorage.getItem(`readerForVolume=${volume_id}`));
            if(readerForVolumeFromLocal!==null){
                setCurrentReader(readerForVolumeFromLocal[0]);
                console.log(readerForVolumeFromLocal[0])
            }
            else{
                const url = `http://localhost:3000/myBooks/${volume_id}`;

                const requestBookReader = {
                    method: 'GET',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                };

                fetch(url, requestBookReader)
                    .then((response) => response.json())
                    .then((data) => {
                    setCurrentReader(data);
                    localStorage.setItem(`readerForVolume=${volume_id}`, JSON.stringify(data));
                    })
                    .catch(() => setFindMyBooks(false));

            }
        }

    }

    if (findMyBooks){
       let myBooksHtml = myBooks.map((book)=>{
        if(book.availability === 0){
            return(
                <tr key={book.volume_id}>
                    <td>{book.book_name}</td>
                    <td>{book.author_name}</td>
                    <td>{book.publication_year}</td>
                    <td>
                    <button onClick={() => deleteBook(book.volume_id)}>Delete book</button>
                    </td>
                </tr>
            )
        }
        else{
            return(
                <React.Fragment key={book.volume_id}>
                        <tr>
                        <td>{book.book_name}</td>
                        <td>{book.author_name}</td>
                        <td>{book.publication_year}</td>
                        <td>
                            <button onClick={() => deleteBook(book.volume_id)}>Delete book</button>
                        </td>
                        <td>
                            <button onClick={() => showReader(book.volume_id)}>Who's the reader?</button>
                        </td>
                        </tr>
                        <tr className={styles.bookReader} style={{ visibility: book.volume_id === currentVolume ? 'visible' : 'collapse'}}>
                            <td colSpan="6">
                                
                                <table>
                                    <tbody>
                                    <tr>
                                        <th>Reader name</th>
                                        <th>Phone</th>
                                        <th>Email</th>
                                        <th>Borrowed date</th>
                                    </tr>
                                    <tr>

                                            <td>
                                            {currentReader?.first_name} {currentReader?.last_name}
                                            </td>
                                            <td>
                                                {currentReader?.phone}
                                            </td>
                                            <td>
                                                {currentReader?.email}
                                            </td>
                                            <td>
                                                {currentReader?.confirmation_date}
                                            </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
          </React.Fragment>
            )

        }
       })
    return (
        <div className={styles["user-card"]}>
            <table>
                <tr>
                    <th>Book Name</th>
                    <th>Author</th>
                    <th>Publishing year</th>
                </tr>
                <tbody>
                    {myBooksHtml}
                </tbody>
            </table>

        </div>
    )


    }
    else{
        return (<p>you don't have books</p>)
    }
}
export default MyBooks;