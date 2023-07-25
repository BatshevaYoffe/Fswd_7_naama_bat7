import { useNavigate } from "react-router-dom";
import { useParams, useEffect, useState } from "react";
import { FaTrash, FaEdit, FaSave } from 'react-icons/fa';
function myBooks(){
    const [myBooks,setMyBooks]=useState([])
    const [findMyBooks, setFindMyBooks] = useState(true);



    useEffect(()=>{
    const myBooksFromLocal = JSON.parse(localStorage.getItem('myBooksList'));
    if (Array.isArray(myBooksFromLocal)) {
      setMyBooks(myBooksFromLocal);
      setFindMyBooks(true);
    } else {
      const url = `http://localhost:3000/myBooks/users/${userid}`;

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
          setTodos(sortedBooks);
          localStorage.setItem('myBooksList', JSON.stringify(sortedBooks));
        })
        .catch(() => setFindMyBooks(false));
    }
    },[])
    if (findMyBooks){

    }
    else{
        retrun (<p>you dont have books</p>)
    }
}
export default myBooks;