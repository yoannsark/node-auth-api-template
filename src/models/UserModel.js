const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    banned: {type: Boolean, required: true, default: false},
}, {timestamps: true});

userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.isBan = function() {
    return this.banned;
};

module.exports = mongoose.model("User", userSchema);
