const userHandler = require(`../handlers/userHandler`);


module.exports = app => {
    app.put(`/api/updateuser`, async (req, res) => {
        //Pass the user to change's field, their updated value and what field they would like to change
        const updatedUser = await userHandler.updateProfile(req.body.userID, req.body.value, req.body.request);
        res.json(updatedUser)
    });
}