import express from  'express'
import bcrypt from  'bcryptjs'
import pool from '../config/db.js';
import { hash } from 'crypto';
const  router = express.Router();



router.get('/Register',(req,res)=>{
    res.render('Register.ejs')
})




router.post('/Register', async (req,res)=>{

    const {Name,Email,Password,ConfirmPassowrd} = req.body;

  try{

    const result = await pool.query('select * from SportsCustomer where email = $1',[Email])

    if(result.rows.length > 1){
        
        const message = "Email is already Exits";
        res.render('Register.ejs',{message})
    }else{
 
             // here i hash the Password and 10 is as Salting Round 
        bcrypt.hash(Password,10, async (err,hash)=>{
               if(err){
                console.log(err)
               }else{
            const result2 = await pool.query('insert into SportsCustomer (name,email,password) values($1,$2,$3)',[Name,Email,hash]) 
            res.render('Login.ejs')
               }
        })
    }



  }catch(err){
    console.log(err)
   res.status(505).send('505')
  }

      
})



export default router;