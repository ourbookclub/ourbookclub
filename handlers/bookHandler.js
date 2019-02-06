const request = require(`request`);

module.exports = {
    //All functions and files are singular on the back end
    searchGoogleBook: async (searchedBook) => {
        let searchResult;
        const search = await request.get(`https://www.googleapis.com/books/v1/volumes?q=${searchedBook}`, (err, response, body) => {
            searchResult = body;
            console.log(body)
        });
        return await searchResult;
    }
}