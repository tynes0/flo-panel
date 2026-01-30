const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    name: { type: String, required: true },
    email: { type: String },
    targets: {
        abu: { type: Number, default: 0 },
        iso: { type: Number, default: 0 },
        tabanlik: { type: Number, default: 0 }
    },
    progress: {
        abu: { type: Number, default: 0 },
        iso: { type: Number, default: 0 },
        tabanlik: { type: Number, default: 0 }
    }
});

module.exports = mongoose.model('User', UserSchema);