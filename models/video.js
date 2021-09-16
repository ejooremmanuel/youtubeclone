const mongoose = require('mongoose');
const { Schema } = mongoose;

const videoSchema = new Schema({
    description: {
        type: 'string',
    },
    title: {
        type: 'string',
    },
    imageLink: {
        type: 'string',
    },
    videoLink: {
        type: 'string',
    },
    creator: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    }

}, { timestamps: true });

const Video = mongoose.model('video', videoSchema);

module.exports = Video;