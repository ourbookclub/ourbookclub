const userHandler = require(`../handlers/userHandler`);
const groupHandler = require(`../handlers/groupHandler`);
const bookHandler = require(`../handlers/bookHandler`);
const postHandler = require(`../handlers/postHandler`);


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
            const added = await groupHandler.addUser(addedUserID, groupID);
            res.json(added);
        } else {
            //TODO Need to have some sort of display on the front end 
            return "You need to be a moderator to add users to the group"
        }
    });

    app.get(`/api/searchbook/:book`, async (req, res) => {
        const searchedBook = req.params.book;

        const response = await bookHandler.searchGoogleBook(searchedBook);
        res.json(response);
    });

    //Before post gets to here validate that there isn't a blank field
    app.post(`/api/newpost`, userHandler.isLoggedIn, async (req, res) => {
        const { groupID, userPost } = req.body;

        const newPost = await postHandler.createPost(req.user._id, groupID, userPost);
        res.json(newPost);
    });

    app.post(`/api/newcomment`, userHandler.isLoggedIn, async (req, res) => {
        const { postID, comment } = req.body;
        const newComment = await postHandler.createComment(req.user._id, postID, comment);
        res.json(newComment)
    });

    //Everything is singular on the backend
    app.get(`/api/getgrouppost/:group`, userHandler.isLoggedIn, async (req, res) => {
        const groupID = req.params.group;
        const groupPosts = await postHandler.getGroupPost(groupID);
        const sortedPosts = await postHandler.sortPostByDate(groupPosts)
        res.json(sortedPosts);
    });

    //TODO CHECK IF USER IS MOD
    app.post(`/api/addbook`, userHandler.isLoggedIn, async (req, res) => {
        //When the user picks a book from google books, this takes the data and saves it down
        const { chosenBook, groupID } = req.body;

        const bookForGroup = await bookHandler.queryAndSaveToDB(chosenBook);

        const isMod = await groupHandler.checkGroupMod(req.user._id, groupID);
        if (isMod) {
            const updatedGroup = await bookHandler.updateCurrentBook(bookForGroup._id, groupID);
            res.json(updatedGroup);
        } else {
            //TODO Add something to show if they tried to add a book they weren't a mod for
            res.json(`Moderator needed to update book`)
            return
        }
    })

    app.put(`/api/addbooktogroup`, userHandler.isLoggedIn, async (req, res) => {
        //Should take a book chosen from google books and add it to the database
        //After the group is created the mod can add a book to the group
        //This route should also move a book to past books and put a new book in current book
        const { bookForGroup } = req.body;
        res.json(bookForGroup);
    });
}