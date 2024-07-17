const mongoose = require("mongoose")
const Schema = mongoose.Schema
const bcrypt = require("bcrypt")



const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    userSince: {
        type: Date,
        default: Date.now
    }
})

//pre save hook to has the users password
userSchema.pre('save', async function(next) {
    const user = this;
    if (user.isModified('password')) {
        try {
            const hash = await bcrypt.hash(user.password, 10);
            user.password = hash;
        } catch (error) {
            return next(error);
        }
    }
});

//checkPassword function to compare hashed password attempt vs database
userSchema.methods.checkPassword = async function (passwordAttempt) {
    try {
        return bcrypt.compare(passwordAttempt, this.password);
    } catch (error) {
        throw(error);
    }
}

//without Password function to remove password when sent to front end
userSchema.methods.withoutPassword = function() {
    const user = this.toObject();
    delete user.password;
    return user;
}

module.exports = mongoose.model("User", userSchema)