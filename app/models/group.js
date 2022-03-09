const mongoose = require('mongoose');

const schema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    isPublic: {
        type: Boolean,
        required: true
    },
    admin: {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    members: [
        {
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        }
    ]
}, { timestamps: true });

mongoose.model('Group', schema);