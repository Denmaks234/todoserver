const express= require('express')
const todoRouter=  express.Router()
const todoController=require('../controllers/todoController')
const authMiddlware=require('../middlware/authMiddlware')


todoRouter.get('/todos',authMiddlware, todoController.getTodos)
todoRouter.post('/createTodo',authMiddlware, todoController.createPost)
todoRouter.put('/updatePost',todoController.updateTodo)
todoRouter.delete('/delete/:id',todoController.deleteTodo)

module.exports=todoRouter