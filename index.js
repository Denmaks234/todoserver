const express = require('express')
require('dotenv').config()
const cors=require('cors')

const todoRouter=require('./routers/todoRouter')
const userRouter=require('./routers/userRouter')
const PORT = process.env.PORT
console.log(PORT)
const app = express()
app.use(cors({
    origin:'http://127.0.0.1:5173',
    credentials:true,
    
}))
app.use(express.json())
app.use('/',userRouter)
app.use('/api',todoRouter)



app.use('/answer',(req,res)=>res.json('ok'))
app.listen(PORT|| 5000 , ()=>console.log('server start'))

