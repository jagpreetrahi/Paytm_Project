const dotenv = require('dotenv');
dotenv.config({path : '../.env'});

console.log(process.env.PORT)
module.exports = {
    PORT  : process.env.PORT
}