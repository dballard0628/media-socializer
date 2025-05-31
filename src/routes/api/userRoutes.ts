import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend
} from '../../controllers/userControllers';

const router = Router();

router.route('/')
  .get(asyncHandler(getUsers))
  .post(asyncHandler(createUser));

router.route('/:userId')
  .get(asyncHandler(getSingleUser))
  .put(asyncHandler(updateUser))
  .delete(asyncHandler(deleteUser));

router.route('/:userId/friends/:friendId')
  .post(asyncHandler(addFriend))
  .delete(asyncHandler(deleteFriend));

export default router;
// This code defines the user routes for the Express application, allowing for CRUD operations on users and managing friendships.