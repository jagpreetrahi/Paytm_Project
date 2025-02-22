const express = require('express');
const {z} = require('zod');
const jwt = require('jsonwebtoken');
const { User, Account } = require('../../db');
const  {UserChecks}  = require('../../middlewares');
const { JWT} = require('../../config/');
const bcrypt = require('bcryptjs')

const router = express.Router();

//zod schema 

const signInBody = z.object({
    username : z.string().email({message : "Invalid Email Aaddress"}),
    password : z.string().min(6 , {message : "Length should be minimum 6"}),
   
})


router.post('/signIn' , async(req ,res) => {

    try {

        const userData = signInBody.safeParse(req.body);
        if(!userData.success){
            return res.status(400).json({
                message : userData.error.errors
            })
        }

        const existingUser = await User.findOne({
            username : req.body.username,
            
        })

        
        if(!existingUser){
            return res.status(401).json({
                message  : "Invalid User or password"
            }) 
        }

        // compare hash password
        const isPasswordValid =  await bcrypt.compare(req.body.password , existingUser.password)
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
       
       
       const token = jwt.sign({userId : existingUser._id}  , JWT.JWT_SECRET , {expiresIn : '2d'});

        return res.json({
            token : token
        })
      
    } catch (error) {
        console.error("SignIn Error:", error);  // Log exact error
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message  // Send a clear error message
        });
    }
    
})

const signUpBody = z.object({
    username : z.string().email({message : "Invalid Email Aaddress"}),
    password : z.string().min(6 , {message : "Length should be minimum 6"}),
    firstName : z.string(),
    lastName : z.string()
})

router.post('/signUp' , async(req , res) => {

    try {
        const userData = signUpBody.safeParse(req.body);
        
        if(!userData.success){
            
              return res.status(400).json({
                 message  : userData.error.errors
              })
        }

        const existingUser = await User.findOne({
            username : req.body.username
        })

       

        if(existingUser){
            return res.status(411).json({
                message : "User already exists"
            })
        }
        const new_user = await User.create({
            username : req.body.username,
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            password  : req.body.password

        })
        
        const userId = new_user._id
          await Account.create({
            userId,
            balance : 1 +  Math.random()* 10000
        })

        const token  = jwt.sign( new_user._id, JWT_SECRET  , {expiresIn : '2d'}, (err) => {
            if (err) throw err;
            
        })
        

        return res.status(200).json({
            message : "User created Successfully",
            user : new_user,
            
            token,
            
        })
    } catch (error) {
        
        return res.status(500).json({
            message : "Internal Server error",
            error : error,
           
        })
    }

})

// validation for update the user details
const updateBody = z.object({
    firstName : z.string(),
    lastName : z.string(),
    password : z.string()
})

router.put('/',  UserChecks.UserValidate,  async(req ,res) => {

    try {
        const updateData = updateBody.safeParse(req.body);

        if(!updateData.success){
            return res.status(403).json({
                message : updateData.error.errors
            })
        }

        const userData = await User.updateOne(
            req.body , {
               id : req.userId
            }
        )

        res.status(200).json({
            message : "Update the user detail successfully",
            user  : userData
        })
    } catch (error) {
        return res.status(500).json({
            message  : "Internal Server Error"
        })
    }

})

router.get('/bulk' , UserChecks.UserValidate, async(req, res) => {
   
    const filterData = req.query.filter || ".*";  // match everything if no filter
    

    try {
        const users = await User.find({
            $or : [{
                firstName : {
                    $regex : filterData,
                    $options : "i"
                }
            } , {
                lastName : {
                    $regex : filterData,
                    $options : "i" // case-insensitive
                }
            }]
        })

       
    
        res.json({
            user : users.map((user) => ({
                firstName : user.firstName,
                lastName : user.lastName,
                username : user.username,
                _id : user._id
    
            }))
        })
    } catch (error) {
        console.error("SignIn Error:", error);
        return res.json({
            message  : "Internal server error",
            error : error.message
        })
    }

 
})

module.exports = router