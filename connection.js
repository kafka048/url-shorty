const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

async function connectToMongoDB(url){
 mongoose.connect(url);
}

module.exports = connectToMongoDB;