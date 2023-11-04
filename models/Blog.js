const mongoose = require("mongoose");
const Blog_Schema = mongoose.Schema({
    
    title:String
    ,
    description:String
    ,
    video:String
    ,
    like:Number
    ,
    tag:String
    ,
    category:String
    ,
    created_at: Date
    ,
    updated_at:Date
});

module.exports = mongoose.model("Blog",Blog_Schema);
