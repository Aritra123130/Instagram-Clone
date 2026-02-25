const mongoose = require('mongoose');


async function connectToDb(){
    await mongoose.connect(process.env.Mongo_URI)
    .then(()=>{
      console.log('Connect to Db');  
    })
}

module.exports = connectToDb;