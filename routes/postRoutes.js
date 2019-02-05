const userHandler = require(`../handlers/userHandler`);
const postHandler = require(`../handlers/postHandler`);


module.exports = app => {
    app.post(`/api/addpost`, userHandler.isLoggedIn, async (req, res) => {
        const { groupID, userPost } = req.body;

        const newPost = await postHandler.createPost(req.user._id, groupID, userPost);
    });
    app.post(`api/addcomment`, userHandler.isLoggedIn, async (req, res) => {

    });
}