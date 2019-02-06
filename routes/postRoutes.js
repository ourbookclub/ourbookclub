const userHandler = require(`../handlers/userHandler`);
const postHandler = require(`../handlers/postHandler`);


module.exports = app => {

    //Before post gets to here validate that there isn't a blank field
    app.post(`/api/newpost`, userHandler.isLoggedIn, async (req, res) => {
        const { groupID, userPost } = req.body;

        const newPost = await postHandler.createPost(req.user._id, groupID, userPost);
        res.json(newPost);
    });
    app.post(`api/addcomment`, userHandler.isLoggedIn, async (req, res) => {

    });
    //Everything is singular on the backend
    app.get(`/api/getgrouppost/:group`, userHandler.isLoggedIn, async (req, res) => {
        const groupID = req.params.group;
        const groupPosts = await postHandler.getGroupPost(groupID);
        const sortedPosts = await postHandler.sortPostByDate(groupPosts)
        res.json(sortedPosts);
    });
}