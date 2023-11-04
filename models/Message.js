const mongoose = require("mongoose");
const Message_Schema = mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        require:true,
    },
    message:{
        type:String,
        required:true,
    },
    created_at:{
        type : Date
    }
});

module.exports = mongoose.model("Message",Message_Schema);
