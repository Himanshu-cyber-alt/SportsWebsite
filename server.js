import express from 'express'
import bodyParser from 'body-parser';
import LoginRoutes from './routes/LoginRoutes.js'
import RegisterRoutes from './routes/Register.js'
const app = express();
const port =  7000;
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended : true}))
app.use(express.static('public'))


app.get('/',(req,res)=>{
    res.render('Home.ejs')
})

app.use('/',RegisterRoutes);
app.use('/',LoginRoutes);










app.listen(port,()=>{
    console.log(`Server is started at port ${port}`)
})