const db = require(`../models`);

const checkDuplicate = async (checkedField, groupToSearch, userID) => {
    let result = false;
    let searchedGroup;
    switch (checkedField) {
        case `group`:
            searchedGroup = await db.Group.findOne({ name: groupToSearch });
            //If there is a group with that name return true
            if (searchedGroup !== null) {
                result = true;
            };
        case `userlist`:
            //Grabs the group that the user is looking to add the user to    
            searchedGroup = await db.Group.findById(groupToSearch);
            const isInGroup = await searchedGroup.userlist.filter(user => user._id === userID);
            if (isInGroup.length > 0) {
                result = true;
            };
            break;
    }
    return result;
}

module.exports = {
    createGroup: async (userID, groupName, groupDescription, currentBook) => {
        //Checks if there is already a group by that name
        //If there is return a bad status code which then can be used to display data to the user
        const isDuplicate = await checkDuplicate(`group`, groupName);
        //Is true if there is a duplicate
        if (isDuplicate) {
            return 500;
        };
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
        //Checks if the user is already added to the group and returns 500 if they are
        //TODO update this so it returns an error message
        const isDuplicate = await checkDuplicate(`userlist`, groupID, addedUserID);
        if (isDuplicate) {
            return 500;
        };
        const newUser = {
            _id: addedUserID,

        };
        //get the user ID, add them to the array userlist within the group
        const updatedGroup = await db.Group.update({ _id: groupID }, { $push: { userlist: newUser } }) //Must be an object as we store if they their permissions
        return updatedGroup;
    },
    checkGroupMod: async (userID, groupID) => {

        //Looks up the group in the database
        const foundGroup = await db.Group.findById([groupID], err => { if (err) { console.log(err) } });
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