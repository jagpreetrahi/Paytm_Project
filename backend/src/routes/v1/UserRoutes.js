const express = require('express');
const {z} = require('zod');
const jwt = require('jsonwebtoken');
const { User } = require('../../db');
const router = express.Router();



//zod schema 
const UserValidate = z.object({
    username : z.string().email({message : "Invalid Email Aaddress"}),
    password : z.string().min(6 , {message : "Length should be minimum 6"}),
    firstName : z.string(),
    lastName  : z.string()

})

router.post('/signIn' , async(req ,res) => {

    try {

        //validate the user
        const userData = UserValidate.safeParse(req.body);
        
        if(!userData.success){
            return res.status(400).json({
                message : userData.error.errors
            })
        }
        
        const new_user = await User.create({
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            password : req.body.password
        })

        res.status(200).json({
            user : new_user,
            message : "User created Successfully"
        })
    } catch (error) {
         res.status(500).json({
            message : "Internal Server Error",
            error : error
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
            username : req.body.username,
            password  : req.body.password

        })

        return res.status(200).json({
            message : "User created Successfully",
            user : new_user
        })
    } catch (error) {
        return res.status(500).json({
            message : "Internal Server error",
            error : error
        })
    }

})

router.put('/userDetail' , (req ,res) => {

})