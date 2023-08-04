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
    
    const deleteItemFromReadingList = (requestId) => {
      const updatedReadingList = myReadingList.filter(item => item.request_id !== requestId);
      setMyReadingList(updatedReadingList);
    };

    const deleteBookFromMyWishList = (request_id,volume_id) => {

    }
    //החזרה של  ספר
    const returnBook = (request_id,volume_id) => {
      debugger;
    const url = `http://localhost:3000/orderBasket/myReadingList/users/${user.id}`;
    const requestUpdateBooksBorrowed = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({request_id,volume_id}),
    };
    fetch(url, requestUpdateBooksBorrowed)
    .then((res) => {
      if(res.status===200)
      deleteItemFromReadingList(request_id);
    })
    .catch((error) => {
      console.log(error);
    });

    }

    useEffect(()=>{
    debugger
    // ספרים שאני נמצא ברשימת המתנה על מנת להשאיל אותם
    console.log("Fetching myWishList...");
    const myWishListFromLocal = JSON.parse(localStorage.getItem('myWishList'));
    if (Array.isArray(myWishListFromLocal) && myWishListFromLocal.length>0) {
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
      console.log("Fetching myWishList from server...");
      fetch(url, requestMyWishList)
        .then((response) => response.json())
        .then((data) => {
          //const sortedWishList = [...data].sort((a, b) => a.id - b.id);
          console.log(data)
          setMyWishList(data);
          if(data.length>0)
           FindMyWishList(true);
          localStorage.setItem('myWishList', JSON.stringify(data));
        })
        .catch(() => setFindMyWishList(false));
    }
   //ספרים שאני כרגע קורא 
   console.log("Fetching myReadingList...");
    const myReadingListFromLocal = JSON.parse(localStorage.getItem('myReadingList'));
    if (Array.isArray(myReadingListFromLocal)&& myReadingListFromLocal.length>0) {
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
      console.log("Fetching myReadingList from server...");
      fetch(url, requestMyReadingList)
        .then((response) => response.json())
        .then((data) => {
          //const sortedWishList = [...data].sort((a, b) => a.id - b.id);
          console.log(data);
          setMyReadingList(data);
          if(data.length>0)
           setFindMyReadingList(true);
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
                    <button onClick={() => deleteBookFromMyWishList(book.request_id,book.volume_id)}>Delete</button>
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
                    <button onClick={() => returnBook(book.request_id,book.volume_id)}>Return book</button>
                    </td>
                </tr>
            )}
        )
    }

         
    
    return (
        <div>
          {myWhisListHtml!==null ? (
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
          ):
          <p>you don't have wish list</p>
          }
      
          {myReadingListHtml!==null ? (
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
          ):
          <p>you don't have reading list </p>}
        </div>
      );
    
    
      


}
export default OrderBasket;