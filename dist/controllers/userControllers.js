"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFriend = exports.addFriend = exports.deleteUser = exports.updateUser = exports.createUser = exports.getSingleUser = exports.getUsers = void 0;
const Users_js_1 = require("../models/Users.js");
const getUsers = async (_req, res) => {
    try {
        const users = await Users_js_1.User.find()
            .select('-__v')
            .populate({ path: 'friends', select: 'username' })
            .populate('thoughts');
        res.status(200).json(users);
    }
    catch (err) {
        res.status(500).json({ message: 'Failed to fetch users', error: err });
    }
};
exports.getUsers = getUsers;
const getSingleUser = async (req, res) => {
    try {
        const user = await Users_js_1.User.findById(req.params.userId)
            .select('-__v')
            .populate('friends')
            .populate('thoughts');
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json(user);
    }
    catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.getSingleUser = getSingleUser;
const createUser = async (req, res) => {
    try {
        const newUser = await Users_js_1.User.create(req.body);
        res.status(201).json(newUser);
    }
    catch (err) {
        res.status(500).json({ message: 'Failed to create user', error: err });
    }
};
exports.createUser = createUser;
const updateUser = async (req, res) => {
    try {
        const updatedUser = await Users_js_1.User.findOneAndUpdate({ _id: req.params.userId }, req.body, { new: true, runValidators: true });
        if (!updatedUser) {
            console.log(`Issue finding user with ID ${req.params.userId}`);
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json(updatedUser);
    }
    catch (err) {
        console.log('Error updating user.', err);
        res.status(500).json({ message: 'Something went wrong' });
    }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res) => {
    try {
        const dbUserData = await Users_js_1.User.findByIdAndDelete(req.params.userId);
        if (!dbUserData) {
            console.log(`Issue finding user with ID ${req.params.userId}`);
            res.status(404).json({ message: 'Issue deleting user with ID' });
            return;
        }
        res.status(200).json({ message: 'User deleted successfully' });
    }
    catch (err) {
        console.log('Error deleting user:', err);
        res.status(500).json({ message: 'Something went wrong.' });
    }
};
exports.deleteUser = deleteUser;
const addFriend = async (req, res) => {
    try {
        const { userId, friendId } = req.params;
        const updatedUser = await Users_js_1.User.findByIdAndUpdate(userId, { $addToSet: { friends: friendId } }, { new: true, runValidators: true });
        if (!updatedUser) {
            res.status(404).json({ message: 'User not found.' });
            return;
        }
        res.status(200).json(updatedUser);
    }
    catch (err) {
        console.error('Error adding friend to friendslist', err);
        res.status(500).json({ message: 'Something went wrong.' });
    }
};
exports.addFriend = addFriend;
const deleteFriend = async (req, res) => {
    try {
        const { userId, friendId } = req.params;
        const updatedUser = await Users_js_1.User.findByIdAndUpdate(userId, { $pull: { friends: friendId } }, { new: true });
        if (!updatedUser) {
            res.status(404).json({ message: 'Error finding user by Id' });
            return;
        }
        res.status(200).json(updatedUser);
    }
    catch (err) {
        console.error('Error deleting friend', err);
        res.status(500).json({ message: 'Error deleting friend.' });
    }
};
exports.deleteFriend = deleteFriend;
