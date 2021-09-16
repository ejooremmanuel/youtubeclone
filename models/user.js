const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    email: {
        type: 'string',
    },
    username: {
        type: 'string',
    },
    password: {
        type: 'string',
    },
    videos: [{
        type: mongoose.Types.ObjectId,
        ref: 'video'
    }]

}, { timestamps: true });

const User = mongoose.model('user', userSchema);

module.exports = User;