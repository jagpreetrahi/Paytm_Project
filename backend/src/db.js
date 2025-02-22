const { default: mongoose} = require('mongoose')
const bcrypt = require('bcryptjs')

const URL = 'mongodb://localhost:27017/paytm?appName=MongoDB+Compass&directConnection=true&serverSelectionTimeoutMS=2000'

async function connectDb() {
    try {
        await mongoose.connect(URL)
        console.log("Successfully connected")
    } catch (error) {
        console.log("MongoDb connection fail" , error.message)
    }
    
}




const UserSchema =  new mongoose.Schema({
    username : {type : String,  required : true, unique : true },
    password : {type : String , required : true ,  minLenght : 3 , maxLength : 6},
    firstName : {type : String  },
    lastName : {type : String }
})

UserSchema.pre('save' , function (next) {
    let user = this; // user instances being saved

    // hash the password if user modified it or a new one
    if(!user.isModified('password')) return next();

    //generate a salt
    bcrypt.genSalt(10, (err, salt) => {
        if(err) return next(err);
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);

            user.password = hash;
            next();
          
        });
    });
})



const accountSchema = new mongoose.Schema({
       userId : {
          type : mongoose.Schema.Types.ObjectId,
          ref : 'User',
          required : true
       },
       balance : {
           type : Number,
           required :true
       }
})

const User  = mongoose.model('User' , UserSchema)
const Account = mongoose.model('Account' , accountSchema)

module.exports = {
    User,
    connectDb,
    Account
}