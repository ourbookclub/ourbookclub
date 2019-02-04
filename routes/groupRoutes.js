const userHandler = require(`../handlers/userHandler`);
const groupHandler = require(`../handlers/groupHandler`);

module.exports = app => {
    //User adds a new group, fills out a form on the book name & description
    //Then adds the current book they're reading
    //THEN hits this route to complete the group
    app.post(`/api/creategroup`, userHandler.isLoggedIn, async (req, res) => {
        const { groupName, groupDescription } = req.body;
        //If 500 is returned a group with that name already exists
        //Else it returns the new group
        const response = await groupHandler.createGroup(req.user._id, groupName, groupDescription);
        res.json(response);

    });

    //Need to find a way for this to approve the user to the group
    app.put(`/api/adduser`, userHandler.isLoggedIn, async (req, res) => {
        const { addedUserID, groupID } = req.body;
        const isMod = await groupHandler.checkGroupMod(req.user._id, groupID);
        if (isMod) {
            const added = await groupHandler.addUser(addedUserID, zgroupID);
            res.json(added)
        } else {
            //TODO Need to have some sort of display on the front end 
            return "You need to be a moderator to add users to the group"
        }
    });

    app.post(`/api/addbooktodb`, userHandler.isLoggedIn, async (req, res) => {
        //When the user picks a book from google books, this takes the data and saves it down

        //The way it flows
        //User creates a group

        //User adds users to the group
        //User adds a book to the group
        //      This splits into two steps, the user searches a book and adds it to the DB
        //      The user adds the book chosen to the DB
    })

    app.put(`/api/addbooktogroup`, userHandler.isLoggedIn, async (req, res) => {
        //Should take a book chosen from google books and add it to the database
        //After the group is created the mod can add a book to the group
        //This route should also move a book to past books and put a new book in current book
    });
}