const db= require('../db')
const decodedData=require('../service/token.service')


class todoController {

    async getTodos(req,res){
        const userData=req.user
        console.log(userData)
        try {
             const users= await  db.query('SELECT * FROM todositems where user_id=$1 ',[userData.id])
             res.json(users.rows)
        } catch (error) {
            res.json(error)
        }
       
    }   

    async createPost(req,res){
        try {
            const userData=req.user
            console.log(userData)
            const {title,descr,completed}=req.body
            if(!title){
               return  res.status(400).send('Не заповнене обовязкове поле')
            }
            
            const newTodo = await  db.query(`INSERT INTO todositems (title, descr,completed,user_id) values ($1,$2,$3,$4) returning *`,[
                title,descr,completed,userData.id
            ])
            
           res.json(newTodo.rows[0])

        } catch (error) {
            res.json(error)
        }
    }


    async   updateTodo(req,res){
        try {

            const {id}=req.params
            console.log(id)
           const  {title,descr,completed}=req.body
           const updatePost = await db.query(`update todositems set title=$1,descr=$2,completed=$3 where id=$4 returning *`,[title,descr,completed,id ])
           res.json(updatePost)

        } catch (error) {
            res.json(error)
        }
    }

    async deleteTodo(req,res){
        try {
            const {id}=req.params
            console.log(id)
            await db.query('delete from todositems where id=$1',[id])
            res.json(`Todo with id ${id} deleted`)
            
        } catch (error) {
            res.json(error)
        }
    }
}

module.exports= new todoController()