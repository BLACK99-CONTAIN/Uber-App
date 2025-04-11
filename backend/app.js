const dotenv=require('dotenv')
dotenv.config()
const express=require('express')
const app=express()
const cors=require('cors')
const db=require('./db/db')
const cookieParser = require('cookie-parser')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
const userrouter = require('./routes/userrouter')
app.use('/users',userrouter)

const captainrouter = require('./routes/captainrouter');
app.use('/captains',captainrouter)

app.get('/',(req,res)=>{
    res.send("Hello world");
})

module.exports=app;