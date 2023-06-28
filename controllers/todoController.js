const db= require('../db')
const decodedData=require('../service/token.service')


class todoController {

    async getTodos(req,res){
        const {id}=req.query
        try {
             const users= await  db.query('SELECT * FROM todositems where user_id=$1 ',[id])
             res.json(users.rows)
        } catch (error) {
            res.json(error)
        }
       
    }

    async createPost(req,res){
        try {
            const {title,descr,completed}=req.body
            const token=req.cookies
            const id=decodedData(token)
            const newPerson = await  db.query(`INSERT INTO todositems (title, descr,completed,user_id) values ($1,$2,$3,$4) returning *`,[
                title,descr,completed,id
            ])
            console.log(newPerson)
            if (!title || !descr){
                res.json('error')
                return
            }
            else{
                 res.json(newPerson.rows[0])
            }
           

        } catch (error) {
            res.json(error)
        }
    }


    async   updateTodo(req,res){
        try {
           const  {id,title,descr,completed}=req.body
           const updatePost = await db.query(`update todositems set title=$1,descr=$2,completed=$3 where id=$4 returning *`,[
            title,descr,completed,id
           ])
           res.json(updatePost)

        } catch (error) {
            res.json(error)
        }
    }

    async deleteTodo(req,res){
        try {
            const {id}=req.params
            await db.query('delete from todositems where id=$1',[id])
            res.json(`Person with id ${id} deleted`)
            
        } catch (error) {
            res.json(error)
        }
    }
}

module.exports= new todoController()