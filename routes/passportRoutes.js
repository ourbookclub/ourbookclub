//This file is for the post routes to hold the passport login and signin functionality
module.exports = function (app, passport) {

    app.get(`/signout`, function (req, res) {
        req.logout();
        res.redirect(`/`);
    });

    //Local Signin / Signup
    app.post(`/signin`, passport.authenticate(`local-signin`, {
        successRedirect: `/`,
        failureRedirect: `/signin`,
        failureFlash: true
    }));

    app.post(`/signup`, passport.authenticate(`local-signup`, {
        successRedirect: `/`,
        failureRedirect: `/signup`,
        failureFlash: true
    }
    ));

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