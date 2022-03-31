const mongoose = require('mongoose');
const { randomBytes, pbkdf2Sync } = require('crypto');

const schema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: true
    },
    salt: {
        type: String
    },
    maps: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Map"
    }],
    groups: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Group"
    }]
}, { timestamps: true });

schema.methods.hashPassword = function() {
    this.salt = randomBytes(16).toString('hex');
    this.password = pbkdf2Sync(this.password, this.salt, 1000, 64, 'sha512').toString('hex');
};

schema.methods.validPassword = function(password){ 
    let hash = pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex'); 
    return this.password === hash; 
};

schema.pre('save', function(next){
    this.groups = this.isNew ? [] : this.groups;
    this.maps = this.isNew ? [] : this.maps;

    if(!this.isModified('password')) return next();
    
    this.hashPassword();
    next();
});

mongoose.model('User', schema);