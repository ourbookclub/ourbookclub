const db = require(`../models`);

const checkDuplicateName = async groupName => {
    const checkedGroup = await db.Group.findOne({ name: groupName });
    if (checkedGroup !== null) {
        return true
    } else {
        return false
    }
}

module.exports = {
    createGroup: async (userID, groupName, groupDescription, currentBook) => {
        //Checks if there is already a group by that name
        //If there is return a bad status code which then can be used to display data to the user
        const isDuplicate = await checkDuplicateName(groupName);
        if (isDuplicate) {
            return 500;
        }
        const newGroup = {
            name: groupName,
            description: groupDescription,
            userlist: {
                _id: userID,
                isAdmin: true,
                isMod: true,
                isBanned: false
            },
            currentBook
        };
        const addedGroup = await db.Group.create(newGroup);

        db.Group.update({ name: groupName }, {})

        return addedGroup;
    },
    // Invite other users to the group
    addUser: async (addedUserID, groupID) => {
        const newUser = {
            _id: addedUserID,

        }
        //get the user ID, add them to the array userlist within the group
        const updatedGroup = await db.Group.update({ _id: groupID }, { $push: { userlist: newUser } }) //Must be an object as we store if they their permissions
        return updatedGroup;
    },
    checkGroupMod: async (userID, groupID) => {

        //Looks up the group in the database
        const foundGroup = await db.Group.findById([groupID], err => { console.log(err) });
        //Finds the current user
        const currentUser = await foundGroup.userlist.find(users => users._id == userID);
        //Checks if that user is a mod and returns a boolean
        const isModerator = currentUser.isMod;
        return isModerator;
    },
    addNewBook: async (groupID, book) => {
    },
    searchForBook: async (book) => {
        //Searches the database if the book has been saved before by ISBN
    }
}