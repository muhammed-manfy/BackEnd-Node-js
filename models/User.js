const mongoose = require("mongoose");
const User_Schema = mongoose.Schema({

  username:String
  ,
  email:String
  ,
  password:String
  ,
  address:{
    type:String,
    default:" ",
    require:false,
  } 
  ,
  emarite: {
     type:String,
     default:" ",
     require:false,
    }
  ,
  city:{
    type:String,
    default:" ",
    require:false
  } 
  ,

  image:{
    type:String,
    default:" ",
    require:false,
  } 
  ,
  phone:{
    type:String,
    default:" ",
    require:false
  }
  ,
  companyName:{
    type:String,
    default:"",
    require:false
  }
  ,
  created_at: Date
  ,
  updated_at: Date
});

module.exports = mongoose.model("User", User_Schema);
