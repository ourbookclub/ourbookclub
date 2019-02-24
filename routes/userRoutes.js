const userHandler = require(`../handlers/userHandler`);


module.exports = app => {
    app.put(`/api/updateuser`, async (req, res) => {
        //Pass the user to change's field, their updated value and what field they would like to change
        const updatedUser = await userHandler.updateProfile(req.body.userID, req.body.value, req.body.request);
        res.json(updatedUser)
    });

    app.post(`/api/newuser`, async (req, res) => {
        //Called after the user signs up with Firebase
        const newUser = {}
        newUser.local = {
            username: req.body.username,
            email: req.body.email,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
        };
        const newUserInDB = await userHandler.saveNewUser(newUser)
        res.json(newUserInDB)
    });

    app.get(`/api/getuser/:email`, async (req, res) => {
        const email = req.params.email;
        const foundUser = await userHandler.getSingleUser(email);
        res.status(200).send(foundUser);
    });

    app.get(`/api/usersearch/:search/:searchParam`, async (req, res) => {
        const { email, searchParam } = req.params;

        console.log(email, searchParam)
        // const foundUser = await userHandler.getSingleUser(email);
        // res.status(200).send(foundUser);
    });
}