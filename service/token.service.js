const jwt =require('jsonwebtoken')

 const decodedData=(token)=>{
    return jwt.decode(token).payload
}
module.exports=decodedData