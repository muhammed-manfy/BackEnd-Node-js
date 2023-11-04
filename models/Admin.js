const mongoose = require("mongoose");
const Admin_Schema = mongoose.Schema({
    email: {
        type: 'string',
        required: true,
        unique: true
    },
    password: {
        type: 'string',
        required: true,
    },
    created_at: {
        type: Date
    },

    updated_at: {
        type: Date
    }
});

module.exports = mongoose.model("Admin", Admin_Schema);
