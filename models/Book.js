const mongoose = require(`mongoose`);

const Schema = mongoose.Schema;

//Everything is to be singular
const BookSchema = new Schema({
    title: String,
    author: String,
    pages: Number,
    description: String
});


module.exports = mongoose.model(`Book`, BookSchema);