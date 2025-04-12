import express from 'express'
import bodyParser from 'body-parser';
import LoginRoutes from './routes/LoginRoutes.js'
import RegisterRoutes from './routes/Register.js'
import session from 'express-session'; 
import passport from 'passport';
import './config/passport.js'; 
import './config/passport.js'



const app = express();
const port =  7000;
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended : true}))
app.use(express.static('public'))


app.use(session({
 
    secret : "Lappy",
    resave : false,
    saveUninitialized : true,
   cookie : {
    maxAge : 1000 * 60 * 60 * 24 // this is 1 day seesion cookie you can reduce 
     // this define how much time user is log in out website
   }
    

}))

app.use(passport.initialize())
app.use(passport.session())


app.get('/',(req,res)=>{
    res.render('Home.ejs')
})

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

app.get(
  "/auth/google/DashBord",
  passport.authenticate("google", {
    successRedirect: "/DashBord",
    failureRedirect: "/login",
  })
);


 app.use('/',RegisterRoutes);
 app.use('/',LoginRoutes);










app.listen(port,()=>{
    console.log(`Server is started at port ${port}`)
})