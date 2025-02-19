const express = require('express');



const UserRoutes = require('./UserRoutes');



const router = express.Router();

router.use('/user' , UserRoutes);



module.exports = router;