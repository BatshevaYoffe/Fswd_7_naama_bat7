import { useNavigate } from "react-router-dom";
import { useParams, useEffect, useState } from "react";
import { FaTrash, FaEdit, FaSave } from 'react-icons/fa';
function orderBasket(){
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const [myWishList,setMyWishList]=useState([]);
    const [myReadingList,setMyReadingList]=useState([]);
    const [FindMyWishList,setFindMyWishList]=useState(false);
    const [FindMyReadingList,setFindMyReadingList]=useState(false);
    
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
        setMyWishList(myReadingListFromLocal);
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
    },[])

}
export default orderBasket;