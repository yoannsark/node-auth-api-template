const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI;

exports.init = async function() {
    try {
        console.log("Connecting to database...")
        await mongoose.connect(MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
        console.log("Connected to %s", MONGODB_URI)
    } catch (err) {
        console.error("App starting error:", err.message);
    }
};
