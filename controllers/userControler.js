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
                res.status(404).send('Цей користувач є в системі')
                return
              }
              if(!email || !password || !username){
                res.status(404).send('Ви не заповнили обовязкове поле')
                return
              }
              const salt = bcrypt.genSaltSync(10)
              const hashPassword= await bcrypt.hash(password,salt)
              const newUser= await db.query(`INSERT INTO users (email, password, username) values ($1,$2,$3) returning * `, [email,hashPassword,username])
              const id=newUser.rows[0].id
              const token = jwt.sign({email,id},process.env.SECRET,{expiresIn:'1d'})
              res.json({accsess:true,token})
                    
        } catch (error) {
          res.status(404).send('Ошибка при регістрації')
        }
    }


    async login(req, res){
      try {
        const {email,password}=req.body
        const user = await  db.query('select * from users where email = $1 ',[email])
      if(!user.rows[0]){
        
        return res.status(401).send('Такого користувача немає')
        
      }
      const validPassword= await bcrypt.compare(password,user.rows[0].password)
      const id=user.rows[0].id
      if (validPassword){
        const token = jwt.sign({email,id},process.env.SECRET,{expiresIn:'24h'})
        return res.json({accsess:true,token})
      }
      else{
        return res.json({accsess:false})
      }
      } catch (error) {
        return res.status(400).send(error)
      }
    }

    async getUser(req,res){
      try {
      const userData=req.user
      let user = await db.query('SELECT * FROM users WHERE id=$1',[userData.id]) 
      user=user.rows[0] 
      if(!user){
        res.status(404).send("Ошибка получения юзера")
        return
      }
      return res.json({user,accsess:true})
      } 
      catch (error) {
        console.log(error)
        return res.status(401).send(error)
      }
      
      
    }
}
module.exports=new userControler()