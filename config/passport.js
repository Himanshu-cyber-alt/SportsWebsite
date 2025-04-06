import passport from "passport";
import session from 'express-session';
import bcrypt from 'bcrypt'



passport.use(new Strategy({
    usernameField: 'RollNumber',  // is like body parser we can get all the req.body for tis  
    passwordField: 'Password'     
}, async function(rollNumber, password, callBack) {
    try {
        const result = await pool.query('SELECT roll, password FROM main_table WHERE roll = $1', [rollNumber]);
        
        if (result.rows.length > 0) {
            const user = result.rows[0];
            const databasePass = user.password;
            
       
            bcrypt.compare(password, databasePass, (err, isMatch) => {
                if (err) {
                    return callBack(err);
                }
                
                if (isMatch) {
                    return callBack(null, user);
                } else {
                    return callBack(null, false, { message: 'Incorrect password' });
                }
            });
        } else {
            return callBack(null, false, { message: 'User not found' });
        }
    } catch (error) {
        return callBack(error);
    }
}));




passport.serializeUser((user, callBack) => {
    callBack(null, user.roll); //  
});



passport.deserializeUser(async (rollNumber, callBack) => {
    try {
        const result = await pool.query('SELECT * FROM main_table WHERE roll = $1', [rollNumber]);
        if (result.rows.length > 0) {
            callBack(null, result.rows[0]);
        } else {
            callBack(new Error('User not found'));
        }
    } catch (error) {
        callBack(error);
    }
});