import passport from "passport";
import session from 'express-session';
import bcrypt from 'bcryptjs'
import { Strategy as LocalStrategy } from 'passport-local';
import pool from "./db.js";
import GoogleStrategy from "passport-google-oauth2";
import dotenv from "dotenv"


dotenv.config();



passport.use(new LocalStrategy({
    usernameField: 'Email',   
    passwordField: 'Password' // match your form field name
                              // match your form field name
}, async function verify(Email, Password, cb) {
    try {
        const result = await pool.query('SELECT * FROM SportsCustomer WHERE email = $1', [Email]);
        const user = result.rows[0];

        if (!user) return cb(null, false); // return 

        bcrypt.compare(Password, user.password, (err, matched) => {
            if (err) return cb(err);
            if (matched) return cb(null, user);
            return cb(null, false);
        });
    } catch (err) {
        return cb(err);
    }
}));



passport.use("google", new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "https://gearupsport.onrender.com/auth/google/DashBord",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    passReqToCallback: true
}, async (req, accessToken, refreshToken, profile, cb) => {
    try {
        const email = profile.email;

        // Check if user already exists
        const result = await pool.query('SELECT * FROM SportsCustomer WHERE email = $1', [email]);
        let user = result.rows[0];

        // If not, insert into DB
        if (!user) {
            const insert = await pool.query(
                'INSERT INTO SportsCustomer (name, email, password) VALUES ($1, $2, $3) RETURNING *',
                [profile.displayName, email, ''] // password can be empty for Google
            );
            user = insert.rows[0];
        }

        return cb(null, user);
    } catch (err) {
        return cb(err);
    }
}));


passport.serializeUser((user,cb)=>{
    return cb(null,user);
})

passport.deserializeUser((user,cb)=>{
    return cb(null,user);
})