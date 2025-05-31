"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const userControllers_1 = require("../../controllers/userControllers");
const router = (0, express_1.Router)();
router.route('/')
    .get((0, express_async_handler_1.default)(userControllers_1.getUsers))
    .post((0, express_async_handler_1.default)(userControllers_1.createUser));
router.route('/:userId')
    .get((0, express_async_handler_1.default)(userControllers_1.getSingleUser))
    .put((0, express_async_handler_1.default)(userControllers_1.updateUser))
    .delete((0, express_async_handler_1.default)(userControllers_1.deleteUser));
router.route('/:userId/friends/:friendId')
    .post((0, express_async_handler_1.default)(userControllers_1.addFriend))
    .delete((0, express_async_handler_1.default)(userControllers_1.deleteFriend));
exports.default = router;
// This code defines the user routes for the Express application, allowing for CRUD operations on users and managing friendships.
