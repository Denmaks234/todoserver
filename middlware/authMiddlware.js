const express=require('express')
const jwt =require('jsonwebtoken')
require('dotenv').config()

  function authMiddlware (req,res,next) {
    try {
    const token = req.headers.autorization.split(' ')[1]
    console.log(token)
    if(token=='null'){
        return res.status(400).send('Ви не авторизовані')
    }
    const decoded=jwt.verify(token,process.env.SECRET)

    req.user=decoded
    next() 
    } catch (error) {
        console.log(error)
        res.json(error)
    }

    
}
module.exports=authMiddlware