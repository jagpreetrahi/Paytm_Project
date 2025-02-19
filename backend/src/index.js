const express = require("express");
const cors  = require('cors')
const UserRoutes = require('./routes');
const {connectDb} = require('./db')
const app = express();
app.use(express.json());
app.use(cors())
const {ServerConfig} = require('./config')

connectDb();

app.use('/api'  , UserRoutes)



app.listen(ServerConfig.PORT  , () => {
    console.log(`Successfully run on PORT ${ServerConfig.PORT}`)
})


