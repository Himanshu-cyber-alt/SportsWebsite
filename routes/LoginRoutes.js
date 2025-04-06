import express from  'express'
import pool from '../config/db.js';
import bcrypt from 'bcrypt'
const  router = express.Router();



router.get('/Login',(req,res)=>{
    res.render('Login.ejs')
})


router.post('/Login',async (req,res)=>{

    const {Email,Password} = req.body;
    try{

        const result = await pool.query('select email,password from Customer form email = $1',[Email])

             const DataBase = result.rows[0];



             if(result.rows.length > 1){
  
                 const DataBasePassword = DataBase.password;

                 bcrypt.compare(Password,DataBasePassword,(err,done)=>{

                      if(err){
                        console.log("shit",err)
                      }else{

                        if(done){
                            res.render('Home.ejs')
                         }else{
                            res.send("Password is incorrect ")
                         }

                      }
                        


                 })


                

             }else{
                res.render('Register.ejs')
             }

    }
    catch(err){
        console.log(err)
    }
})

export default router;