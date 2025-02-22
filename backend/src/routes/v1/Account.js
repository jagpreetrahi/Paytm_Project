const express = require('express');
const router  = express.Router();
const {UserChecks} = require('../../middlewares');
const {Account} = require('../../db');
const { default: mongoose } = require('mongoose');


// routes defines

router.get('/balance' ,UserChecks.UserValidate,  async (req, res) => {
    const userBalance = await Account.findOne({
         userId : req.userid
    })

    res.status(200).json({
        message : "You are able to see the balance",
        Balance : userBalance.balance

    })
})

router.post('/transfer' , UserChecks.UserValidate , async (req, res) => {

    // make a session for transaction
    const session = await  mongoose.startSession()

    // start the transaction
     session.startTransaction()

     const {amount , to} = req.body
     // fetch the account for transacrtion 
     const account = await Account.findOne({userId : req.userId}).session(session)

     if(!account || account.balance < amount){
         await session.abortTransaction()
          return res.status(403).json({
              message : "Insufficient Balance"
          })
     }

     const toAccount = await Account.findOne({userId : to}).session(session);

     if(!toAccount){
        await session.abortTransaction()
        return res.status(403).json({
            message  : "Invalid Account"
        })
     }

    // perform the transfer of money 
    try {
        await Account.updateOne({userId : req.userId} , {
            $inc : {balance : -amount}
        }).session(session)


        await Account.updateOne({userId : req.userId} , {
            $inc : {balance : amount}
        }).session(session)

        // commit the trasaction
        await session.commitTransaction();
        res.status(200).json({
            message : "Transfer Successfully"
        })

    } catch (error) {
        res.status(400).json({
            message : error
        })
    }
  
})


module.exports = router