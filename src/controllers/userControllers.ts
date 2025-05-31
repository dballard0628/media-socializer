import { Request, Response } from 'express';
import { User } from '../models/Users';

export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.find()
      .select('-__v')
      .populate({ path: 'friends', select: 'username' })
      .populate('thoughts');

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch users', error: err });
  }
};

export const getSingleUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.params.userId)
      .select('-__v')
      .populate('friends')
      .populate('thoughts');

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};


export const createUser = async (req: Request, res: Response) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create user', error: err });
  }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.params.userId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      console.log(`Issue finding user with ID ${req.params.userId}`);
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    console.log('Error updating user.', err);
    res.status(500).json({ message: 'Something went wrong' });
  }
};


export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const dbUserData = await User.findByIdAndDelete(req.params.userId);

    if (!dbUserData) {
      console.log(`Issue finding user with ID ${req.params.userId}`);
      res.status(404).json({ message: 'Issue deleting user with ID' });
      return;
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    console.log('Error deleting user:', err);
    res.status(500).json({ message: 'Something went wrong.' });
  }
};


export const addFriend = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, friendId } = req.params;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { friends: friendId } },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      res.status(404).json({ message: 'User not found.' });
      return;
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    console.error('Error adding friend to friendslist', err);
    res.status(500).json({ message: 'Something went wrong.' });
  }
};


export const deleteFriend = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, friendId } = req.params;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { friends: friendId } },
      { new: true }
    );

    if (!updatedUser) {
      res.status(404).json({ message: 'Error finding user by Id' });
      return;
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    console.error('Error deleting friend', err);
    res.status(500).json({ message: 'Error deleting friend.' });
  }
};

