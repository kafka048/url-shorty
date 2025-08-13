const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
    shortID : {
        type: String, 
        required: true,
        unique : true,  
    },
    redirectUrl : {
        type: String,
        required: true,
    },
    visitHistory : [{
        clicks : Number,
        timestamp: {
            type: Date,
            default: () => Date.now()
        },
        ip : String,
        userAgent : String
    }]


});

const URL = mongoose.model("urls", urlSchema);

module.exports = URL;