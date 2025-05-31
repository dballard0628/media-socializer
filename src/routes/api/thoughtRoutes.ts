import { Router } from 'express';
const router = Router();
import { getSingleThought, getThoughts, createThought, updateThought, deleteThought, createReaction, deleteReaction } from '../../controllers/thoughtsController';

// Async handler to catch errors and avoid returning a value from controllers
const asyncHandler = (fn: any) => (req: any, res: any, next: any) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

router.route('/').get(asyncHandler(getThoughts)).post(asyncHandler(createThought));

router.route('/:thoughtId').get(asyncHandler(getSingleThought)).put(asyncHandler(updateThought)).delete(asyncHandler(deleteThought));

router.route('/:thoughtId/reactions').post(asyncHandler(createReaction));

router.route('/:thoughtId/reactions/:reactionId').delete(asyncHandler(deleteReaction));

export default router;