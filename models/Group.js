const mongoose = require(`mongoose`);

const Schema = mongoose.Schema;

//Everything is to be singular
const GroupSchema = new Schema({
    name: {
        type: String,
        unique: true
    },
    description: String,
    userlist: [
        {
            _id: String,
            isAdmin: {
                type: Boolean,
                default: false
            },
            isMod: {
                type: Boolean,
                default: false
            },
            isBanned: {
                type: Boolean,
                default: false
            }
        }
    ],
    speed: String,
    currentBook: String, //This is going to be the id of the book which they searched
    chapterForBook: Number,
    // Everything is singular
    //Array of books that this group has read in the past
    pastBook: [String]
});


module.exports = mongoose.model(`Group`, GroupSchema);