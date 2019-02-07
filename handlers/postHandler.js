const db = require(`../models`);

module.exports = {
    createPost: async (userID, groupID, userPost) => {

        const newPost = {
            user: userID,
            group: groupID,
            date: Date.now(),
            title: userPost.title,
            text: userPost.text,
            isSpoiler: userPost.isSpoiler
        };

        const addedPost = await db.Post.create(newPost);

        return addedPost;
    },
    getGroupPost: async (groupID) => {
        const groupPosts = await db.Post.find({ group: groupID });
        return groupPosts;
    },
    sortPostByDate: async (groupPosts) => {
        const sortedPosts = groupPosts.sort((a, b) => b.date - a.date);
        return sortedPosts;
    },
    createComment: async (userID, postID, comment) => {
        console.log(userID, postID, comment);

        const newComment = {
            user: userID,
            text: comment,
            date: Date.now()
        };

        const postedComment = await db.Post.updateOne({ _id: postID }, { $push: { comment: newComment } });

        return postedComment
    }
}