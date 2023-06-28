const bcrypt = require('bcrypt')
const db=require('../db')
const jwt =require('jsonwebtoken')
require('dotenv').config()


class userControler {
    async signup (req,res){
        try {
            const  {email,password,username}=req.body
            const haveUsername= await db.query(`select * from users where username = $1  `,[username])
            const haveEmail= await db.query(`select * from users where email = $1  `,[email])
              
              if(haveUsername.rows.length || haveEmail.rows.length){
                return res.json('this user is in system')
              }
              
              const salt = bcrypt.genSaltSync(10)
              const hashPassword= await bcrypt.hash(password,salt)
              const newUser= await db.query(`INSERT INTO users (email, password, username) values ($1,$2,$3) returning * `, [email,hashPassword,username])
              const userId=newUser.rows[0].id
              const token = jwt.sign({email,userId},process.env.SECRET,{expiresIn:'1d'})
              res.json(token)
                    
        } catch (error) {
            res.json(error)
        }
    }


    async login(req, res){
      try {
        const {email,password}=req.body
        const user = await  db.query('select * from users where email = $1 ',[email])
      
      if(!user){
        return res.json ('Такого користувача немає')
      }
      const validPassword= await bcrypt.compare(password,user.rows[0].password)
      const id=user.rows[0].id
      if (validPassword){
        const token = jwt.sign({email,id},process.env.SECRET,{expiresIn:'1d'})
        res.cookie("token",token,{httpOnly:true,domain:'localhost'})
        return res.json({accsess:true})
      }
      } catch (error) {
        res.json(error)
      }
    }
}
module.exports=new userControler()