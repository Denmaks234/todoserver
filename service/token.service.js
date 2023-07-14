const jwt =require('jsonwebtoken')

 const decodedData=(token)=>{
    const decoded=jwt.verify(token,process.env.SECRET)
    const {id}=decoded
    return id
    
}
module.exports=decodedData