const express=require('express')
const jwt =require('jsonwebtoken')
require('dotenv').config()

 function authMiddlware (req,res,next) {
    try {
    const {token} = req.cookies
  
    if(!token){
        return res.json('Ви не авторизовані')
    }
   
    const decoded=jwt.verify(token,process.env.SECRET)
     console.log(decoded)
    next() 
    } catch (error) {
        console.log(error)
        res.json(error)
    }

    
}
module.exports=authMiddlware