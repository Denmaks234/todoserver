const express= require('express')
const userRouter=  express.Router()
const userControler=require('../controllers/userControler')
const authMiddlware = require('../middlware/authMiddlware')

userRouter.post('/signup',userControler.signup)
userRouter.post('/login',userControler.login)
userRouter.get('/getUser',authMiddlware,userControler.getUser)
module.exports=userRouter