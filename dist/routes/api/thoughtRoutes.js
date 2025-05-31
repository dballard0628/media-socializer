"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const thoughtsController_js_1 = require("../../controllers/thoughtsController.js");
// Async handler to catch errors and avoid returning a value from controllers
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
router.route('/').get(asyncHandler(thoughtsController_js_1.getThoughts)).post(asyncHandler(thoughtsController_js_1.createThought));
router.route('/:thoughtId').get(asyncHandler(thoughtsController_js_1.getSingleThought)).put(asyncHandler(thoughtsController_js_1.updateThought)).delete(asyncHandler(thoughtsController_js_1.deleteThought));
router.route('/:thoughtId/reactions').post(asyncHandler(thoughtsController_js_1.createReaction));
router.route('/:thoughtId/reactions/:reactionId').delete(asyncHandler(thoughtsController_js_1.deleteReaction));
exports.default = router;
