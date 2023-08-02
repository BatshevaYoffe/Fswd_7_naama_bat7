const express = require('express');
const router = express.Router();
const { sqlConnect } = require('./connectTodb.js');


router.get("/", function (req, res) {

})

/**
 * 
 *     book_name,author_name,publication_year,category,
 *     
 * 
 */

const getBooks = (filterModel) => {
    return getBooksQuery() +
    filterByBookName(filterModel.book_name) +
    filterByAuthorName(filterModel.author_name);
}
//שאילתא השולפת את כל הספרים הקיימים במערכת
const getBooksQuery = () => {
    return "select * from volumes v inner join books b on v.book_code=b.id where deleted=0 ";
}

const filterByBookName = (bookName) => {
    if (bookName) {
        return `and b.book_name=${bookName} `;
    }
    return "";
}

const filterByAuthorName=(authorName)=>{
    if (authorName) {
        return `and b.author_name=${authorName} `;
    }
    return "";
}

const filterByCategory = (category) => {
    if (category) {
        return `and b.book_name=${bookName} `;
    }
    return "";
} 

console.log(getBooks({book_name:"הארי פוטר",author_name:"גיי קיי רולינג"}));