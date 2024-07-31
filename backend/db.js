const mongoose = require('mongoose');
const mongoURI = "mongodb://127.0.0.1:27017/ddn";

const connectToMongo = ()=>{
    try{
    mongoose.connect(mongoURI);
    console.log("Connected to Mongo Successfully");
    } catch(err){
        handleError(err);
    }
}
module.exports = connectToMongo;