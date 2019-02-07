const axios = require(`axios`);

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

module.exports = {
    //All functions and files are singular on the back end
    //When searching google books spaces need to be turned into +
    searchGoogleBook: async (searchedBook) => {
        const search = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchedBook}&maxResults=20&printType=Books`)

        const searchedBookArray = await search.data.items.filter(book => {
            if (checkForISBN(book.volumeInfo.industryIdentifiers)) {
                return true;
            };
        });

        //Right now this is the best way I can think of returning the correct array
        //First we filter above to get rid of all books without an ISBN
        //Then we map through the array to pull out only the data we need
        const returnedBookList = await searchedBookArray.map(book => {
            const newBook = {
                title: book.volumeInfo.title,
                authors: book.volumeInfo.authors, //This comes back as an array, could be changed if we only want one
                pageCount: book.volumeInfo.pageCount,
                publishedDate: book.volumeInfo.publishedDate,
                description: book.volumeInfo.description
            };
            return newBook;
        });

        return searchedBookArray;
    },
    saveBookToDB: async (savedBook) => {

    }
};