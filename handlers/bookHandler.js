const axios = require(`axios`);
const db = require(`../models`);

const checkForISBN = (industryIdentifiers) => {
    //Goes through the data that google returned and searches if the book has an ISBN number tied to it
    //If it doesn't then it will not be returned

    const hasISBN13 = industryIdentifiers.find(id => id.type === `ISBN_13`);
    const hasISBN10 = industryIdentifiers.find(id => id.type === `ISBN_10`);

    if (hasISBN13 || hasISBN10) {
        return true;
    } else {
        return false;
    }
};

const checkDuplicate = async (bookTitle) => {
    try {
        const searchedBook = await db.Book.findOne({ title: bookTitle });
        //If there is a group with that name return true
        if (searchedBook !== null) {
            return true
        };
    } catch (err) {
        //TODO Something to show the error
        console.log(err);
    };
};

module.exports = {
    //All functions and files are singular on the back end
    //When searching google books spaces need to be turned into +
    searchGoogleBook: async (searchedBook) => {
        try {
            const search = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchedBook}&maxResults=20&printType=Books`);
        } catch (err) {
            //TODO Add an error message here
            return "Something went wrong"
        }

        //TODO Try and do this in one ForEach or something
        const searchedBookArray = await search.data.items.filter(book => checkForISBN(book.volumeInfo.industryIdentifiers));

        //Right now this is the best way I can think of returning the correct array
        //First we filter above to get rid of all books without an ISBN
        //Then we map through the array to pull out only the data we need
        const returnedBookList = await searchedBookArray.map(book => {
            //TODO Get ISBN

            const newBook = {
                title: book.volumeInfo.title,
                authors: book.volumeInfo.authors, //This comes back as an array, could be changed if we only want one
                image: book.volumeInfo.imageLinks.thumbnail,
                pageCount: book.volumeInfo.pageCount,
                publishedDate: book.volumeInfo.publishedDate,
                description: book.volumeInfo.description
            };
            return newBook;
        });

        return returnedBookList;
    },
    saveBookToDB: async (savedBook) => {
        //If the book is not a duplicate then save it to the database
        if (!checkDuplicate(savedBook.title)) {
            try {
                const newBook = await db.Book.create(savedBook);
                return newBook;
            } catch (err) {
                //TODO Add an error message here
                return err;
            };
        } else {
            //If the book is a duplicate, then get the book and return it to the user as if it was saved so they can then add it to the group
            try {
                const foundBook = await db.Book.findOne({ title: savedBook.title });
                return foundBook;
            } catch (err) {
                //TODO Add an error message here
                return err
            }
        };
    }
};