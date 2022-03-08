const mongoose = require('mongoose');

const schema = mongoose.Schema({
    description: String,
    question: String,
    keywords: [{ type: String }],
    author: {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }
    
}, { timestamps: true });

mongoose.model('Map', schema);