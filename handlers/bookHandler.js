const axios = require(`axios`);

module.exports = {
    //All functions and files are singular on the back end
    searchGoogleBook: async (searchedBook) => {
        const search = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchedBook}`)

        const searchedBookArray = search.data.items.filter(book => {
            if (book.volumeInfo.industryIdentifiers.includes({ "type": "ISBN_13" } || book.volumeInfo.industryIdentifiers.includes({ "type": "ISBN_10" }))) {
                const newBook = {
                    title: book.volumeInfo.title,
                    authors: book.volumeInfo.authors, //This comes back as an array, could be changed if we only want one
                    pages: book.volumeInfo, //TODO HERE
                    publishedDate: book.volumeInfo.publishedDate,
                    description: book.volumeInfo.description
                };
                return newBook;
            }
        });

        return await search.data.items;
    }
}

/*
const hasISBN13 = industryIdentifiers.find(id => id.type === `ISBN_13`);
const hasISBN10 = industryIdentifiers.find(id => id.type === `ISBN_10`);

console.log(hasISBN13, hasISBN10)

if (hasISBN13 || hasISBN10) {
    console.log(`working`)
} else {
    console.log(`not working`)
}
*/