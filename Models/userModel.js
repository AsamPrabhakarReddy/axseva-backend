const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        trim: true
    },
    jobtitle: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address']
    },
    phoneNumber: {
        type: String,
        trim: true,
        
    },
    companyName: {
        type: String,
        trim: true
    },
    lookingFor: {
        type: String,
        required: true,

        trim: true
    },
    message: {
        type: String,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
