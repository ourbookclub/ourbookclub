const db = require("../models"); //TODO Possibly delete this later on, shouldn't be accessing database on routes page
const userHandler = require(`../handlers/userHandler`);
const groupHandler = require(`../handlers/groupHandler`);

module.exports = app => {
    app.post(`/api/searchbook`, async (req, res) => {
        console.log(req.body);
    });

    app.put(`/api/updateuser`, async (req, res) => {
        //Pass the user to change's field, their updated value and what field they would like to change
        const result = await userHandler.updateProfile(req.body.userID, req.body.value, req.body.request);
    });

    //TODO Delete below, these are only for testing
    app.post(`/api/testdb`, async (req, res) => {
        switch (req.body.request) {
            case `post`:
                const newPost = {};
                newPost.user = req.body.userID;
                newPost.group = req.body.group;
                newPost.date = new Date(req.body.date);
                newPost.text = req.body.text;
                newPost.isSpoiler = req.body.isSpoiler;
                newPost.comment = req.body.comment
                db.Post.create(newPost)
                break;
            case `group`:
                //TODO write group DB test here
                const newGroup = {};
                newGroup.groupInfo = req.body.groupInfo;
                newGroup.userlist = req.body.userlist;
                newGroup.currentBook = req.body.currentBook;
                newGroup.pastBook = req.body.pastBook;
                db.Group.create(newGroup);
                res.json(newGroup)
                break;
        }
    });
};