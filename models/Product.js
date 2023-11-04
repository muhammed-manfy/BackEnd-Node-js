const mongoose = require("mongoose");
const Product_Schema = mongoose.Schema({
    
    productName:String
    ,
    price:Number
    ,
    image:String
    ,
    description:String
    ,
    tag:String
    ,
    brand:String
    ,
    category:String
    ,
    created_at:Date
    ,
    updated_at:Date
});

module.exports = mongoose.model("Product",Product_Schema);
