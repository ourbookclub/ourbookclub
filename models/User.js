const mongoose = require(`mongoose`);
var bcrypt = require('bcrypt-nodejs');

const Schema = mongoose.Schema;

//Everything is to be singular
const UserSchema = new Schema({

    local: {
        firstname: {
            type: String,
        },
        lastname: String,
        zip: String,
        username: {
            type: String,
            unique: true
        },
        email: {
            type: String,
            unique: true,
        },
        password: {
            type: String
        }
    },
    facebook: {
        id: String,
        token: String,
        displayname: String,
        email: String
    },
    twitter: {
        id: String,
        token: String,
        displayName: String,
        username: String,
        email: String
    },
    favoriteGenre: [String], //Makes this an array of strings to store the user's favorite genres
    readingPace: String,
    notification: [
        {
            category: {}, //Should be Group: groupID || Message: userID || Request {friend: userID} OR {joingroup: groupID}
            seen: Boolean
        }
    ], //Stores notifications to the user profile
    blockedUser: [String] // Array of user ids
});

//Methods for validation
UserSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model(`User`, UserSchema);