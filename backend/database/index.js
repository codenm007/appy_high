require("dotenv").config();
const mongoose = require('mongoose');
mongoose.connect(
  `${process.env.mongodb_url}`
).then(result => {
     console.log("Connected successfully !")
})
.catch(err => console.log(err))

const db_schema = mongoose.Schema;

module.exports = db_schema