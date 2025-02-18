const { default: mongoose} = require('mongoose')

const URL = 'mongodb://localhost:27017/paytm?appName=MongoDB+Compass&directConnection=true&serverSelectionTimeoutMS=2000'

async function conenctDb() {
    try {
        await mongoose.connect(URL)
        console.log("Successfully connected")
    } catch (error) {
        console.log("MongoDb connection fail" , error.message)
    }
    
}


const UserSchema =  new mongoose.Schema({
    username : {type : String , required : true , unique : true },
    password : {type : String , required : true  , minLenght : 3 , maxLength : 6},
    firstName : {type : String , required : true },
    lastName : {type : String , required : true }
})

const User  = mongoose.model('User' , UserSchema)

module.exports = {
    User,
    conenctDb
}