const db = require(`../models`);

const checkDuplicate = async (checkedField, groupToSearch, userID) => {
    let result = false;
    let searchedGroup;
    //TODO Do something other than log these errors
    switch (checkedField) {
        case `group`:
            try {
                searchedGroup = await db.Group.findOne({ name: groupToSearch });
                //If there is a group with that name return true
                if (searchedGroup !== null) {
                    result = true;
                };
            } catch (err) {
                console.log(err);
            };
            break;
        case `userlist`:
            //Grabs the group that the user is looking to add the user to 
            try {
                searchedGroup = await db.Group.findById(groupToSearch);
            } catch (err) {
                console.log(err);
            };
            try {
                const isInGroup = await searchedGroup.userlist.filter(user => user._id === userID);
                if (isInGroup.length > 0) {
                    result = true;
                };
            } catch (err) {
                console.log(err);
            };
            break;
        case `benchmark`:
            //Group to search here is the whole group
            const benchmarkAlreadyCompleted = await groupToSearch.previousBenchmark.filter(benchmark => benchmark === checkedField);
            if (benchmarkAlreadyCompleted > 0) {
                result = true;
            };
            break;
    }
    return result;
}

module.exports = {
    createGroup: async (userID, groupName, groupDescription) => {
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
            }
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
    setPageOrChapter: async (groupID, pageOrChapter, totalCount) => {
        //This is hit after they check if the current user trying to make these changes is a mod
        //Also, should only be hit one time unless they go into the settings and change it
        const updatedGroup = await db.Group.findByIdAndUpdate([groupID], { $set: { pageOrChapter: pageOrChapter, totalPageOrChapter: totalCount } }, { new: true })
        return updatedGroup;
    },
    updateBenchmark: async (groupID, nextBenchmark) => {
        //Checks if the user is trying to set the benchmark higher than the total benchmarks
        const currentGroup = await db.Group.findById([groupID]);

        const isDuplicate = await checkDuplicate(`benchmark`, currentGroup);

        if (+nextBenchmark <= +currentGroup.totalPageOrChapter) {
            await db.Group.findByIdAndUpdate([groupID], { $set: { currentBenchmark: +nextBenchmark } }, { new: true });
            if (isDuplicate) {

            }
        } else {
            //TODO Proper error message
            return { 'error': `Cannot set a benchmark higher than the total benchmarks` };
        };
    }
}