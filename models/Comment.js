const mongoose = require("mongoose");

const Comment_Schema = mongoose.Schema({
    username:String
    ,
    comment:String
    ,
    product_id:String
    ,
    created_at:Date
});

module.exports = mongoose.model("Comment",Comment_Schema);
