const db = require(`../models`);
const zipcodes = require(`zipcodes`);

const validateZip = (zipToCheck) => {
    let zip = ``;
    zipToCheck.trim().replace(/\s+/g, '').split(``).forEach(item => { if (!isNaN(item)) { zip += item } });

    //Checks if the zip code inputted is a valid US zip
    if (typeof zipcodes.lookup(zip) === `undefined`) {
        return false;
    } else {
        return true;
    };
};

//This is for updating the user profile once created
//The user only has access to the local profile
module.exports = {
    getUserList: async () => {
        const userlist = await db.User.find({});
        return userlist;
    },
    updateProfile: (userID, updatedValue, request) => {
        //Switch statement here to decide on what the user is updating
        //They can only update one part of their profile at a time
        let updatedField = ``;
        switch (request) {
            case `username`:
                //TODO Add something to display if the username was already taken
                //Verify that the username isn't taken manually, in addition to having the protection in the database
                //The manual verification should not be case sensitive
                //Mongoose won't let them save a duplicate username but currently won't tell them
                updatedField = `local.username`;
                break;
            case `firstname`:
                updatedField = `local.firstname`;
                break;
            case `lastname`:
                updatedField = `local.lastname`;
                break;
            case `zip`:
                //Checks if the zip is valid, if so it processes the update, otherwise it skips it
                if (validateZip(updatedValue)) {
                    updatedField = `local.zip`;
                } else {
                    return `Invalid Zip` //TODO Add something here to display that the zip is invalid
                }
                break;
            case `email`:
                //TODO Add something to display if the username was already taken
                //Sweet Alert 2 handles email validation
                updatedField = `local.email`;
                break;
        };
        //TODO Check for duplicates
        db.User.updateOne({ _id: userID }, { $set: { [updatedField]: updatedValue } }, (err, data) => {
            if (err) {
                return err;
            } else {
                return "Updated Successfully"
            }
        });
    },
    isLoggedIn: (req, res, next) => {
        // if user is authenticated in the session, carry on 
        if (req.isAuthenticated()) {
            return next();
        }
        // if they aren't redirect them to the home page
        res.redirect(`/`);
    },
    getProfile: async (userID) => {
        const userProfile = await db.User.findById([userID]);
        return userProfile;
    }
};