const express = require('express')
require('dotenv').config()
const todoRouter=require('./routers/todoRouter')
const userRouter=require('./routers/userRouter')
const   cookieParser = require('cookie-parser')
const PORT = process.env.PORT
console.log(PORT)
const app = express()
app.use(cookieParser())
app.use(express.json())
app.use('/',userRouter)
app.use('/api',todoRouter)



app.use('/answer',(req,res)=>res.send('ok'))
app.listen(PORT, ()=>console.log('server start'))

