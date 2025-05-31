"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const reactionSchema = new mongoose_1.Schema({
    reactionId: {
        type: mongoose_1.Schema.Types.ObjectId,
        default: () => new mongoose_1.Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    toJSON: {
        getters: true,
        transform: function (_doc, ret) {
            if (ret.createdAt) {
                ret.createdAt = ret.createdAt.toLocaleDateString();
            }
            return ret;
        }
    },
    id: false
});
const thoughtSchema = new mongoose_1.Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema]
}, {
    toJSON: {
        virtuals: true,
        getters: true,
        transform: function (_doc, ret) {
            if (ret.createdAt) {
                ret.createdAt = ret.createdAt.toLocaleDateString();
            }
            return ret;
        }
    },
    id: false
});
// Create a virtual property `reactionCount` that gets the length of the thought's reactions array
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});
const Thought = (0, mongoose_1.model)('Thought', thoughtSchema);
exports.default = Thought;
