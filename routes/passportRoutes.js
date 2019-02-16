const db = require(`../models`);
require(`dotenv`).config();
const jwtSecret = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken')

//This file is for the post routes to hold the passport login and signin functionality
module.exports = function (app, passport) {

    app.get(`/signout`, function (req, res) {
        req.logout();
        res.status(200);
    });

    //Local Signin / Signup
    app.post(`/signup`, (req, res, next) => {
        passport.authenticate(`local-signup`, (err, user, info) => {
            if (err) {
                console.log(err);
            };
            //If there was no message defined
            if (info != undefined) {
                console.log(info.message);
                res.send(info.message);
            } else {
                //TODO Break this out into its own file
                req.logIn(user, async  err => {
                    const profileField = {
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        username: req.body.username,
                        email: req.body.email,
                        zip: req.body.zip
                    };

                    //Save the rest of the user profile outside of the auth
                    await db.User.findOneAndUpdate({ 'local.email': profileField.email },
                        { $set: { 'local.firstname': profileField.firstname, 'local.lastname': profileField.lastname, 'local.username': profileField.username, 'local.zip': profileField.zip } },
                        { new: true });
                    const token = jwt.sign({ id: user.email }, jwtSecret);
                    res.status(200).send({
                        auth: true,
                        token: token,
                        message: 'Signup Successful'
                    });
                })
            };
        })(req, res, next);
    });

    app.post(`/signin`, (req, res, next) => {
        passport.authenticate(`local-signin`, (err, user, info) => {
            if (err) {
                //TODO Better error handing
                console.log(err);
            }
            if (info != undefined) {
                console.log(info.message);
                res.send(info.message);
            } else {
                console.log(user)
                req.logIn(user, async err => {
                    console.log(user)
                    const foundUser = await db.User.findOne({ 'local.email': user.email });
                    const token = jwt.sign({ id: user.email }, jwtSecret);
                    res.status(200).send({
                        auth: true,
                        token: token,
                        message: 'Signin Successful',
                        username: foundUser.local.username,
                        email: foundUser.local.email,
                        firstname: foundUser.local.firstname,
                        lastname: foundUser.local.lastname,
                    });
                });
            };
        })(req, res, next);
    });

    app.get(`/getuser`, (req, res, next) => {
        passport.authenticate(`jwt`, { session: false }, (err, user, info) => {
            if (err) {
                console.log(err);
            };
            if (info != undefined) {
                console.log(info.message);
                res.send(info.message);
            } else {
                console.log('User found');
                res.status(200).send({
                    auth: true,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email,
                    username: user.username,
                    message: 'User found successfully'
                });
            };
        })(req, res, next);
    });

    //Facebook
    app.get(`/auth/facebook`, passport.authenticate(`facebook`, {
        scope: [`email`]
    }));
    app.get(`/auth/facebook/callback`, passport.authenticate(`facebook`, {
        successRedirect: `/`,
        failureRedirect: `/signin`
    }));

    //Twitter
    app.get(`/auth/twitter`, passport.authenticate(`twitter`, {
        scope: [`include_email=true`]
    }));

    app.get(`/auth/twitter/callback`, passport.authenticate(`twitter`, {
        successRedirect: `/`,
        failureRedirect: `/login`
    }));

    //Facebook
    app.get(`/connect/facebook`, passport.authorize(`facebook`, {
        scope: `email`
    }));

    // Facebook Callback
    app.get(`/connect/facebook/callback`, passport.authorize(`facebook`, {
        successRedirect: `/`,
        failureRedirect: `/`
    }));

    //Twitter
    app.get(`/connect/twitter`, passport.authorize(`twitter`, {
        scope: `email`
    }));

    // Twitter callback
    app.get(`/connect/twitter/callback`, passport.authorize(`twitter`, {
        successRedirect: `/`,
        failureRedirect: `/`
    }));

    // TODO UNLINK ACCOUNTS
    // https://scotch.io/tutorials/easy-node-authentication-linking-all-accounts-together
    // local -----------------------------------
    app.get(`/unlink/local`, function (req, res) {
        const User = req.user;
        User.local.email = undefined;
        User.local.password = undefined;
        User.save(function (err) {
            res.redirect(`/`);
        });
    });

    // facebook -------------------------------
    app.get(`/unlink/facebook`, function (req, res) {
        const User = req.user;
        User.facebook.token = undefined;
        User.save(function (err) {
            res.redirect(`/`);
        });
    });

    // twitter --------------------------------
    app.get(`/unlink/twitter`, function (req, res) {
        const User = req.user;
        User.twitter.token = undefined;
        User.save(function (err) {
            res.redirect(`/`);
        });
    });
};