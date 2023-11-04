const mongoose = require("mongoose");
const Order_Schema = mongoose.Schema({
    products:[],
    userId: {
        type: String
    },
    username: {
        type: String
    },
    address: {
        type: String
    },
    city: {
        type: String
    },
    emarite: {
        type: String
    },
    companyName: {
        type: String
    },
    phone: {
        type: String
    },
    email: {
        type: String
    },
    amount: {
        type: String
    },
    subtotal: {
        type: String
    },
    created_at: {
        type: Date
    },
    updated_at: {
        type: Date
    }
});

module.exports = mongoose.model("Order", Order_Schema);
