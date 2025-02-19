const express = require('express');
const {z} = require('zod');
const jwt = require('jsonwebtoken');
const { User, Account } = require('../../db');
const  {UserChecks}  = require('../../middlewares');
const { JWT_SECRET } = require('../../config');
const bcrypt = require('bcryptjs')

const router = express.Router();

//zod schema 
const UserValidate = z.object({
    username : z.string().email({message : "Invalid Email Aaddress"}),
    password : z.string().min(6 , {message : "Length should be minimum 6"}),
})


router.post('/signIn' , async(req ,res) => {

    try {

        const userData = UserValidate.safeParse(req.body);
        if(!userData.success){
            return res.status(400).json({
                message : userData.error.errors
            })
        }

        

        // // Compare passwords
        // const isMatch = await bcrypt.compare(password, userData.password);
        // if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
        
        const new_user = await User.create({
            username : req.body.username,
            password : req.body.password
        })

        const savedUser = await new_user.save();

       
        return res.status(200).json({
            user : savedUser,
            message : "User created Successfully"
        })
    } catch (error) {
         res.status(500).json({
            message : "Internal Server Error",
            error : error.errors
         })
    }
    
})

router.post('/signUp' , async(req , res) => {

    try {
        const userData = UserValidate.safeParse(req.body);

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
          
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            password  : req.body.password

        })

        const token  = jwt.sign( new_user, JWT_SECRET , (err, asyncToken) => {
            if (err) throw err;
            console.log(asyncToken);
        })

        return res.status(200).json({
            message : "User created Successfully",
            user : new_user,
            token
        })
    } catch (error) {
        return res.status(500).json({
            message : "Internal Server error",
            error : error,
           
        })
    }

})

router.put('/',  UserChecks.UserValidate,  async(req ,res) => {

    try {
        const updateData = UserValidate.safeParse(req.body);

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

router.get('/bulk' , async(req, res) => {
    const filterData = req.query.filter || "";

    const users = await User.find({
        $or : [{
            firstName : {
                $regex : filterData,
                $option : "i"
            }
        } , {
            lastName : {
                $regex : filterData,
                $optional : "i" // case-insensitive
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
})

module.exports = router