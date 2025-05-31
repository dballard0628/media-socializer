"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReaction = exports.createReaction = exports.deleteThought = exports.updateThought = exports.createThought = exports.getSingleThought = exports.getThoughts = void 0;
const mongoose_1 = require("mongoose");
const Thoughts_1 = __importDefault(require("../models/Thoughts"));
const Users_1 = require("../models/Users");
const isValidObjectId = (id) => mongoose_1.Types.ObjectId.isValid(id);
const getThoughts = async (_req, res) => {
    try {
        const thoughts = await Thoughts_1.default.find().select('-__v');
        return res.json(thoughts);
    }
    catch (err) {
        console.error('Error fetching thoughts:', err);
        return res.status(500).json({ message: 'Server error' });
    }
};
exports.getThoughts = getThoughts;
const getSingleThought = async (req, res) => {
    const { thoughtId } = req.params;
    if (!isValidObjectId(thoughtId)) {
        return res.status(400).json({ message: 'Invalid Thought ID' });
    }
    try {
        const thought = await Thoughts_1.default.findById(thoughtId).select('-__v');
        if (!thought) {
            return res.status(404).json({ message: 'No thought found with that ID' });
        }
        return res.status(200).json(thought);
    }
    catch (err) {
        console.error('Error retrieving thought:', err);
        return res.status(500).json({ message: 'Server error' });
    }
};
exports.getSingleThought = getSingleThought;
const createThought = async (req, res) => {
    try {
        const thought = await Thoughts_1.default.create(req.body);
        const user = await Users_1.User.findByIdAndUpdate(req.body.userId, { $addToSet: { thoughts: thought._id } }, { new: true });
        if (!user) {
            res.status(404).json({ message: 'No user with that ID' });
            return;
        }
        res.status(200).json(user);
        return res.status(201).json({ message: 'Thought created successfully 🎉' });
    }
    catch (err) {
        console.error('Error creating thought:', err);
        return res.status(500).json({ message: 'Server error' });
    }
};
exports.createThought = createThought;
const updateThought = async (req, res) => {
    const { thoughtId } = req.params;
    if (!isValidObjectId(thoughtId)) {
        return res.status(400).json({ message: 'Invalid Thought ID' });
    }
    try {
        const updatedThought = await Thoughts_1.default.findByIdAndUpdate(thoughtId, req.body, { new: true, runValidators: true });
        if (!updatedThought) {
            return res.status(404).json({ message: 'No thought found with that ID' });
        }
        return res.status(200).json(updatedThought);
    }
    catch (err) {
        console.error('Error updating thought:', err);
        return res.status(500).json({ message: 'Server error' });
    }
};
exports.updateThought = updateThought;
const deleteThought = async (req, res) => {
    const { thoughtId } = req.params;
    if (!isValidObjectId(thoughtId)) {
        return res.status(400).json({ message: 'Invalid Thought ID' });
    }
    try {
        const deletedThought = await Thoughts_1.default.findByIdAndDelete(thoughtId);
        if (!deletedThought) {
            return res.status(404).json({ message: 'No thought found with that ID' });
        }
        return res.status(200).json({ message: 'Thought deleted successfully' });
    }
    catch (err) {
        console.error('Error deleting thought:', err);
        return res.status(500).json({ message: 'Server error' });
    }
};
exports.deleteThought = deleteThought;
const createReaction = async (req, res) => {
    const { thoughtId } = req.params;
    if (!isValidObjectId(thoughtId)) {
        return res.status(400).json({ message: 'Invalid Thought ID' });
    }
    try {
        const updatedThought = await Thoughts_1.default.findByIdAndUpdate(thoughtId, { $addToSet: { reactions: req.body } }, { new: true, runValidators: true });
        if (!updatedThought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        return res.status(200).json(updatedThought);
    }
    catch (err) {
        console.error('Error adding reaction:', err);
        return res.status(500).json({ message: 'Server error' });
    }
};
exports.createReaction = createReaction;
const deleteReaction = async (req, res) => {
    const { thoughtId, reactionId } = req.params;
    if (!isValidObjectId(thoughtId) || !isValidObjectId(reactionId)) {
        return res.status(400).json({ message: 'Invalid ID(s)' });
    }
    try {
        const updatedThought = await Thoughts_1.default.findByIdAndUpdate(thoughtId, { $pull: { reactions: { reactionId: new mongoose_1.Types.ObjectId(reactionId) } } }, { new: true });
        if (!updatedThought) {
            return res.status(404).json({ message: 'Thought not found or no reaction to delete' });
        }
        return res.status(200).json(updatedThought);
    }
    catch (err) {
        console.error('Error deleting reaction:', err);
        return res.status(500).json({ message: 'Server error' });
    }
};
exports.deleteReaction = deleteReaction;
