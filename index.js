const express = require('express')
require('dotenv').config()
const cors=require('cors')

const todoRouter=require('./routers/todoRouter')
const userRouter=require('./routers/userRouter')
const PORT = process.env.PORT
console.log(PORT)
const app = express()
app.use(cors({
    origin:'https://todo-front-inky.vercel.app',
    credentials:true,
    
}))
app.use(express.json())
app.use('/',userRouter)
app.use('/api',todoRouter)

app.use('/answer',(req,res)=>res.json('okey'))
app.listen(PORT|| 5000 , ()=>console.log('server start'))

