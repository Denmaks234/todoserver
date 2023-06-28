const express= require('express')
const userRouter=  express.Router()
const userControler=require('../controllers/userControler')

userRouter.post('/signup',userControler.signup)
userRouter.post('/login', userControler.login)
module.exports=userRouter