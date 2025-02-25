const {JWT} = require('../config')
const jwt = require('jsonwebtoken');


const UserValidate = (req, res , next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer')){
        return res.status(400).json({
             message : "Header not provide"
        })
    }

    try {
        const payload = authHeader.split(' ')[1];
        
        const decode = jwt.verify(payload , JWT.JWT_SECRET);
        console.log(decode);
        if(decode.userId){
            req.userId = decode.userId;
            next();
        }
        else{
            return  res.status(403).json({})
        }
       


    } catch (error) {
        return res.status(403).json({})
    }

}

module.exports = {
    UserValidate
}