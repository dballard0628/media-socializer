"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const thoughtRoutes_js_1 = __importDefault(require("./thoughtRoutes.js"));
const userRoutes_js_1 = __importDefault(require("./userRoutes.js"));
router.use('/thoughts', thoughtRoutes_js_1.default);
router.use('/users', userRoutes_js_1.default);
exports.default = router;
