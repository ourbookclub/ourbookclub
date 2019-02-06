module.exports = {
    searchBooks: async () => {
        $.ajax(`https://www.googleapis.com/books/v1/volumes?q=${searchedBook}&key=${apiKey}`, {
            type: `GET`,
        }).then(() => {
            console.log("working");
        });
    }
}