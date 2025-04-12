import express from 'express';
import passport from 'passport';
import { ensureAuthenticated } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET Login Page
router.get('/Login', (req, res) => {
      res.render('Login.ejs')
});

router.get('/Logout', (req, res) => {
    req.logout(err => {
        if (err) return next(err);
        res.redirect('/Login');
    });
});


// 
router.post('/Login', passport.authenticate('local', {
    successRedirect: '/DashBord',
    failureRedirect: '/Login', // 🔁 Better to go back to login on failure
}));


// Protected Route
router.get('/DashBord', ensureAuthenticated, (req, res) => {
    res.render('DashBord.ejs');
});


export default router;
