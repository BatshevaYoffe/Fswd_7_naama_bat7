const express = require('express');
const router = express.Router();
const { sqlConnect } = require('./connectTodb.js');


router.post("/filter", function (req, res) {

    const { filterModel } = req.body;

    // const q = getBooksQuery(filterModel);

    getBooks(filterModel)
        .then((books) => {
            getCategories(books)
                .then((categories) => {
                    
                })
                .catch((err) => {
                    console.error(err);
                    res.status(500).send("An error occurred");
                })
            res.status(200).json(books);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send("An error occurred");
        });
})

const getBooks = (filterModel) => {
    const q = getBooksQuery(filterModel);
    return sqlConnect(q)
}

const getCategories = (books) => {
    const booksIds = books.map(b => b.book_code);
    const q = getCategoriesQuery(booksIds);
    return sqlConnect(q)
}

const getCategoriesQuery = (booksIds) => {
    const valuesString = booksIds.join(', ');
    return `select * from book_categories where category_id in (${valuesString})`
}

const getBooksQuery = (filterModel) => {
    const query = getBooksBaseQuery() +
        filterByBookName(filterModel.book_name) +
        filterByAuthorName(filterModel.author_name) +
        filterByCategory(filterModel.category_id) +
        filterByPublicationYear(filterModel.publication_year);

    return query;
}
//שאילתא השולפת את כל הספרים הקיימים במערכת
const getBooksBaseQuery = () => {
    return "select * from volumes v inner join books b on v.book_code=b.id where deleted=0 ";
}

const filterByBookName = (bookName) => {
    if (bookName) {
        return `and b.book_name='${bookName}' `;
    }
    return "";
}

const filterByPublicationYear = (publicationYear) => {
    if (publicationYear) {
        return `and b.publication_year='${publicationYear}' `;
    }
    return "";
}

const filterByAuthorName = (authorName) => {
    if (authorName) {
        return `and b.author_name='${authorName}' `;
    }
    return "";
}

const filterByCategory = (categoryId) => {
    if (categoryId) {
        return `and exists(select * from book_categories bc where bc.book_id = v.book_code and bc.category_id = ${categoryId}) `;
    }
    return "";
}

const runSqlQuery = (query) => {

}

module.exports = router;