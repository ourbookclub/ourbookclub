const mongoose = require(`mongoose`);

const Schema = mongoose.Schema;

//Everything is to be singular
const BookSchema = new Schema({
    title: String,
    author: [String],
    chapter: Number, //All DB items are singular
    pageCount: Number,
    image: String,
    description: String,
    preview: String
});


module.exports = mongoose.model(`Book`, BookSchema);