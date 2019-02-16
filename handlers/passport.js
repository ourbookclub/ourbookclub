const User = require(`../models/User`); //Only requiring user here as we are only manipulating the user within passport
const zipcodes = require(`zipcodes`);
require(`dotenv`).config();

const jwtSecret = process.env.JWT_SECRET;

module.exports = (passport) => {

    const LocalStrategy = require(`passport-local`).Strategy;
    const FacebookStrategy = require(`passport-facebook`).Strategy;
    const TwitterStrategy = require('passport-twitter').Strategy;
    const JWTstrategy = require(`passport-jwt`).Strategy;
    const ExtractJWT = require(`passport-jwt`).ExtractJwt;

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });

    //LOCAL SIGNUP
    passport.use(`local-signup`, new LocalStrategy(
        {
            usernameField: `email`,
            passwordField: `password`,
            session: false
        }, async (email, password, done) => {
            //First input validation checking, then onto passport signup
            //Email isn't case sensitive in passport

            //TODO ZIP validation

            //TODO Check for duplicate usernames
            //TODO Throw a better error message if the email is a duplicate
            //First check if the user is logged in
            const foundUser = await User.findOne({ 'local.email': email })
            if (foundUser != null) {
                return done(null, false, { message: 'That email is already taken' });
            } else {
                const newUser = new User();
                newUser.local.email = email;
                newUser.local.password = newUser.generateHash(password);
                newUser.save(function (err) {
                    if (err) {
                        throw err;
                    }
                    return done(null, newUser);
                });
            };
        }
    ));

    //LOCAL SIGNIN
    passport.use(`local-signin`, new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField: `email`,
        passwordField: `password`,
        session: false
    }, async (email, password, done) => { // callback with username and password from our form
        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        const foundUser = await User.findOne({ 'local.email': email });

        if (foundUser === null) {
            return done(null, false, { message: `Incorrect Email or Password` });
        } else if (!foundUser.validPassword(password)) {
            return done(null, false, { message: `Invalid Email or Password.` });
        } else {
            return done(null, foundUser.local);
        }
    }));

    // Facebook Signin / Signup
    passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK,
        passReqToCallback: true,
        profileFields: ['id', 'displayName', 'emails']
    }, function (req, token, refreshToken, profile, done) {

        process.nextTick(() => {

            if (!req.user) {

                //Save if new
                User.findOne({ 'facebook.id': profile.id }, function (err, user) {
                    //If error connecting to the database stop everything
                    if (err) {
                        return done(err);
                    }

                    if (user) {
                        return done(null, user); //User is found, return that user's info
                    } else {
                        //Create a user as there was none found
                        const newUser = new User();
                        //Set all of their facebook info to the new user
                        newUser.facebook.id = profile.id;
                        newUser.facebook.token = token;
                        newUser.facebook.displayname = profile.displayName;
                        newUser.facebook.email = profile.emails[0].value;

                        //Add first time registerer from Facebook to local as well
                        newUser.local.username = profile.displayName;

                        //Save the new user to the database
                        newUser.save(err => {
                            if (err) {
                                throw err;
                            };

                            //If successful return the new user
                            return done(null, newUser);
                        })
                    };
                });
            } else {
                // user already exists and is logged in, we have to link accounts
                const User = req.user; // pull the user out of the session

                // update the current users facebook credentials
                User.facebook.id = profile.id;
                User.facebook.token = token;
                User.facebook.displayname = profile.displayName;
                User.facebook.email = profile.emails[0].value;

                // save the user
                User.save(function (err) {
                    if (err)
                        throw err;
                    return done(null, User);
                });
            }
        });
    }
    ));

    const opts = {
        jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('JWT'),
        secretOrKey: jwtSecret
    };

    passport.use('jwt', new JWTstrategy(opts, async (jwt_payload, done) => {
        try {
            const foundUser = await User.findOne({ email: jwt_payload.id });
            if (foundUser) {
                console.log('user found in db');
                done(null, foundUser);
            } else {
                done(null, false);
            };
        } catch (err) {
            done(err);
        };
    }))

    //Twitter Signin / Signup
    passport.use(new TwitterStrategy({
        consumerKey: process.env.TWITTER_KEY,
        consumerSecret: process.env.TWITTER_SECRET_KEY,
        callbackURL: process.env.TWITTER_CALLBACK,
        includeEmail: true
    },
        function (req, token, tokenSecret, profile, done) {
            console.log(req.user)
            // asynchronous
            process.nextTick(function () {

                // check if the user is already logged in
                if (!req.user) {

                    User.findOne({ 'twitter.id': profile.id }, function (err, user) {
                        if (err)
                            return done(err);

                        if (user) {
                            // if there is a user id already but no token (user was linked at one point and then removed)
                            if (!user.twitter.token) {
                                user.twitter.token = token;
                                user.twitter.username = profile.username;
                                user.twitter.displayName = profile.displayName;

                                user.save(function (err) {
                                    if (err)
                                        throw err;
                                    return done(null, user);
                                });
                            }

                            return done(null, user); // user found, return that user
                        } else {
                            // if there is no user, create them
                            var newUser = new User();

                            newUser.twitter.id = profile.id;
                            newUser.twitter.token = token;
                            newUser.twitter.username = profile.username;
                            newUser.twitter.displayName = profile.displayName;

                            newUser.save(function (err) {
                                if (err)
                                    throw err;
                                return done(null, newUser);
                            });
                        }
                    });

                } else {
                    // user already exists and is logged in, we have to link accounts
                    var user = req.user; // pull the user out of the session

                    user.twitter.id = profile.id;
                    user.twitter.token = token;
                    user.twitter.username = profile.username;
                    user.twitter.displayName = profile.displayName;

                    user.save(function (err) {
                        if (err)
                            throw err;
                        return done(null, user);
                    });
                }
            })
        }));
};
