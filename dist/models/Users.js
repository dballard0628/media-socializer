"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
// Schema to create User model
const userSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must match a valid email address!'],
    },
    thoughts: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Thought',
        },
    ],
    friends: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
}, {
    toJSON: {
        virtuals: true,
    },
    id: false,
});
// Virtual property `friendCount` returns total number of friends
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});
// Export the User model as a named export
exports.User = (0, mongoose_1.model)('User', userSchema);
