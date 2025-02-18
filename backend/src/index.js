const express = require("express");
const cors  = require('cors')
const {UserRoutes} = require('./routes')
const app = express();
const {ServerConfig} = require('./config')

app.use(express.json());
app.use(cors())



app.use('/api' , UserRoutes)



app.listen(ServerConfig.PORT  , () => {
    console.log(`Successfully run on PORT ${ServerConfig.PORT}`)
})


