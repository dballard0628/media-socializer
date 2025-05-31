"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = __importDefault(require("../models/User"));
const Thought_1 = __importDefault(require("../models/Thought"));
const router = express_1.default.Router();
// GET all users
router.get('/', async (_req, res) => {
    try {
        const users = await User_1.default.find()
            .select('-__v')
            .populate('thoughts')
            .populate('friends');
        res.json(users);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
// GET a single user by _id
router.get('/:userId', async (req, res) => {
    try {
        const user = await User_1.default.findOne({ _id: req.params.userId })
            .select('-__v')
            .populate('thoughts')
            .populate('friends');
        if (!user) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }
        res.json(user);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
// POST a new user
router.post('/', async (req, res) => {
    try {
        const user = await User_1.default.create(req.body);
        res.json(user);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
// PUT to update a user by _id
router.put('/:userId', async (req, res) => {
    try {
        const user = await User_1.default.findOneAndUpdate({ _id: req.params.userId }, { $set: req.body }, { runValidators: true, new: true });
        if (!user) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }
        res.json(user);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
// DELETE to remove user by _id
router.delete('/:userId', async (req, res) => {
    try {
        const user = await User_1.default.findOneAndDelete({ _id: req.params.userId });
        if (!user) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }
        // BONUS: Remove associated thoughts
        await Thought_1.default.deleteMany({ _id: { $in: user.thoughts } });
        res.json({ message: 'User and associated thoughts deleted!' });
    }
    catch (err) {
        res.status(500).json(err);
    }
});
// POST to add a new friend to a user's friend list
router.post('/:userId/friends/:friendId', async (req, res) => {
    try {
        const user = await User_1.default.findOneAndUpdate({ _id: req.params.userId }, { $addToSet: { friends: req.params.friendId } }, { new: true });
        if (!user) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }
        res.json(user);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
// DELETE to remove a friend from a user's friend list
router.delete('/:userId/friends/:friendId', async (req, res) => {
    try {
        const user = await User_1.default.findOneAndUpdate({ _id: req.params.userId }, { $pull: { friends: req.params.friendId } }, { new: true });
        if (!user) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }
        res.json(user);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.default = router;
