import { useNavigate } from "react-router-dom";
import { useParams, useEffect, useState } from "react";
import { FaTrash, FaEdit, FaSave } from 'react-icons/fa';
import styles from "./Info.module.css";

function OrderBasket(){
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const [myWishList,setMyWishList]=useState([]);
    const [myReadingList,setMyReadingList]=useState([]);
    const [FindMyWishList,setFindMyWishList]=useState(false);
    const [FindMyReadingList,setFindMyReadingList]=useState(false);
    
    const deleteBookFromMyWishList = (request_id,book_code) => {

    }
    const returnBook = (request_id,book_code) => {

    }

    useEffect(()=>{
    debugger
    // ספרים שאני נמצא ברשימת המתנה על מנת להשאיל אותם
    const myWishListFromLocal = JSON.parse(localStorage.getItem('myWishList'));
    if (Array.isArray(myWishListFromLocal)) {
        setMyWishList(myWishListFromLocal);
        setFindMyWishList(true);
    } else {
      const url = `http://localhost:3000/orderBasket/wishList/users/${user.id}`;

      const requestMyWishList = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };

      fetch(url, requestMyWishList)
        .then((response) => response.json())
        .then((data) => {
          //const sortedWishList = [...data].sort((a, b) => a.id - b.id);
          setMyWishList(data);
          localStorage.setItem('myWhisList', JSON.stringify(data));
        })
        .catch(() => setFindMyWishList(false));
    }
   //ספרים שאני כרגע קורא 
    const myReadingListFromLocal = JSON.parse(localStorage.getItem('myReadingList'));
    if (Array.isArray(myReadingListFromLocal)) {
        setMyReadingList(myReadingListFromLocal);
        setFindMyReadingList(true);
    } else {
      const url = `http://localhost:3000/orderBasket/myReadingList/users/${user.id}`;

      const requestMyReadingList = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };

      fetch(url, requestMyReadingList)
        .then((response) => response.json())
        .then((data) => {
          //const sortedWishList = [...data].sort((a, b) => a.id - b.id);
          setMyReadingList(data);
          localStorage.setItem('myReadingList', JSON.stringify(data));
        })
        .catch(() => setFindMyReadingList(false));
    }
    },[])
    let myWhisListHtml=null;
    let myReadingListHtml=null;
    
    if (FindMyWishList){
        myWhisListHtml = myWishList.map((book)=>{
            return(
                <tr key={book.volume_id}>
                    <td>{book.book_name}</td>
                    <td>{book.author_name}</td>
                    <td>{book.publication_year}</td>
                    <td>{book.request_date}</td>
                    <td>
                    <button onClick={() => deleteBookFromMyWishList(book.request_id,book.book_code)}>Delete</button>
                    </td>
                </tr>
            )}
        )
    }
    if (FindMyReadingList){
        myReadingListHtml = myReadingList.map((book)=>{
            return(
                <tr key={book.volume_id}>
                    <td>{book.book_name}</td>
                    <td>{book.author_name}</td>
                    <td>{book.publication_year}</td>
                    <td>{book.confirmation_date}</td>
                    <td>
                    <button onClick={() => returnBook(book.request_id,book.book_code)}>Return book</button>
                    </td>
                </tr>
            )}
        )
    }

         
    
    return (
        <div>
          {myWhisListHtml && (
            <div className={styles["user-card"]}>
              <h1> My Wish List</h1>
              <table>
                <tr>
                  <th>Book Name</th>
                  <th>Author</th>
                  <th>Publishing year</th>
                  <th>Request Date</th>
                </tr>
                <tbody>
                  {myWhisListHtml}
                </tbody>
              </table>
            </div>
          )}
      
          {myReadingListHtml && (
            <div className={styles["user-card"]}>
              <h1> My reading list</h1>
              <table>
                <tr>
                  <th>Book Name</th>
                  <th>Author</th>
                  <th>Publishing year</th>
                  <th>Since when have I had the book?</th>
                </tr>
                <tbody>
                  {myReadingListHtml}
                </tbody>
              </table>
            </div>
          )}
        </div>
      );
    
    
      


}
export default OrderBasket;