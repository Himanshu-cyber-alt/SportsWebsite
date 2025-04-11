import express from 'express';
import passport from 'passport';

const router = express.Router();

router.get('/auth/google',
    passport.authenticate('google', { scope: ['email', 'profile'] })
);

router.get('/auth/google/DashBord',
    passport.authenticate('google', {
        failureRedirect: '/login',
        successRedirect: '/DashBord'  // You can change this to your actual dashboard page
    })
);

export default router;
