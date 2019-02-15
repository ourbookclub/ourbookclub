const userHandler = require(`../handlers/userHandler`);
const groupHandler = require(`../handlers/groupHandler`);
const postHandler = require(`../handlers/postHandler`);


module.exports = app => {
    app.get(`/api/getuser/`, userHandler.isLoggedIn, async (req, res) => {
        const userProfile = await userHandler.getProfile(req.user._id);

        res.json(userProfile);
    });

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
    app.put(`/api/addusertogroup`, userHandler.isLoggedIn, async (req, res) => {
        const { addedUserID, groupID } = req.body;
        const isMod = await groupHandler.checkGroupMod(req.user._id, groupID);
        if (isMod) {
            const added = await groupHandler.addUser(addedUserID, groupID);
            res.json(added);
        } else {
            //TODO Need to have some sort of display on the front end 
            return "You need to be a moderator to add users to the group"
        };
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
        res.json(newComment);
    });

    //Everything is singular on the backend
    app.get(`/api/getgrouppost/:group`, userHandler.isLoggedIn, async (req, res) => {
        const groupID = req.params.group;
        const groupPosts = await postHandler.getGroupPost(groupID);
        const sortedPosts = await postHandler.sortPostByDate(groupPosts);
        res.json(sortedPosts);
    });

    //Adds the amount of pages or chapters to the Club
    app.put(`/api/updatepagesetup/`, userHandler.isLoggedIn, async (req, res) => {
        const { totalCount, pageOrChapter, groupID } = req.body;

        //Checks if the user is a mod of the group they're currently trying to update
        const isMod = await groupHandler.checkGroupMod(req.user._id, groupID);
        if (isMod) {
            const updatedGroup = await groupHandler.setPageOrChapter(groupID, pageOrChapter, totalCount)
            res.json(updatedGroup)
        } else {
            //TODO Add something to show if they tried to update a group they weren't a mod for
            res.json({ 'error': `Moderator needed to update book` });
        };
    });

    app.put(`/api/updatebenchmark`, userHandler.isLoggedIn, async (req, res) => {
        const { nextBenchmark, groupID } = req.body;

        //TODO Check if the nextBenchmark is submitted as a number either here or before the route is hit

        //Checks if the user is a mod of the group they're currently trying to update
        const isMod = await groupHandler.checkGroupMod(req.user._id, groupID);
        if (isMod) {
            const updatedGroup = await groupHandler.updateBenchmark(groupID, nextBenchmark)
            res.json(updatedGroup)
        } else {
            //TODO Add something to show if they tried to update a group they weren't a mod for
            res.json({ 'error': `Moderator needed to update book` });
        };

    });
}