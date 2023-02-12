const mongoose = require("mongoose");

const UsreSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    token: {
        type: String
    }
})


const User = mongoose.model("User", UsreSchema);

module.exports = { User };