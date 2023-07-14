const express = require('express')
require('dotenv').config()
const cors=require('cors')

const todoRouter=require('./routers/todoRouter')
const userRouter=require('./routers/userRouter')
const   cookieParser = require('cookie-parser')
const PORT = process.env.PORT
console.log(PORT)
const app = express()
app.use(cookieParser())
app.use(cors({
    origin:'http://127.0.0.1:5173',
    credentials:true,
    
}))
app.use(express.json())
app.use('/',userRouter)
app.use('/api',todoRouter)



app.use('/answer',(req,res)=>res.send('ok'))
app.listen(PORT, ()=>console.log('server start'))

