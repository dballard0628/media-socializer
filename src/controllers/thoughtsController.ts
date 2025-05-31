import { Request, Response } from 'express';
import mongoose, { Types } from 'mongoose';
import Thoughts from '../models/Thoughts';
import { User } from '../models/Users';


const isValidObjectId = (id: string) => Types.ObjectId.isValid(id);

export const getThoughts = async (_req: Request, res: Response) => {
  try {
    const thoughts = await Thoughts.find().select('-__v');
    return res.json(thoughts);
  } catch (err) {
    console.error('Error fetching thoughts:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const getSingleThought = async (req: Request, res: Response) => {
  const { thoughtId } = req.params;

  if (!isValidObjectId(thoughtId)) {
    return res.status(400).json({ message: 'Invalid Thought ID' });
  }

  try {
    const thought = await Thoughts.findById(thoughtId).select('-__v');
    if (!thought) {
      return res.status(404).json({ message: 'No thought found with that ID' });
    }
    return res.status(200).json(thought);
  } catch (err) {
    console.error('Error retrieving thought:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const createThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thoughts.create(req.body);
    const user = await User.findByIdAndUpdate(
      req.body.userId,
      { $addToSet: { thoughts: thought._id } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'Thought created, but no user found with that ID' });
    }

    return res.status(201).json({ message: 'Thought created successfully 🎉' });
  } catch (err) {
    console.error('Error creating thought:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const updateThought = async (req: Request, res: Response) => {
  const { thoughtId } = req.params;

  if (!isValidObjectId(thoughtId)) {
    return res.status(400).json({ message: 'Invalid Thought ID' });
  }

  try {
    const updatedThought = await Thoughts.findByIdAndUpdate(
      thoughtId,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedThought) {
      return res.status(404).json({ message: 'No thought found with that ID' });
    }

    return res.status(200).json(updatedThought);
  } catch (err) {
    console.error('Error updating thought:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const deleteThought = async (req: Request, res: Response) => {
  const { thoughtId } = req.params;

  if (!isValidObjectId(thoughtId)) {
    return res.status(400).json({ message: 'Invalid Thought ID' });
  }

  try {
    const deletedThought = await Thoughts.findByIdAndDelete(thoughtId);

    if (!deletedThought) {
      return res.status(404).json({ message: 'No thought found with that ID' });
    }

    return res.status(200).json({ message: 'Thought deleted successfully' });
  } catch (err) {
    console.error('Error deleting thought:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const createReaction = async (req: Request, res: Response) => {
  const { thoughtId } = req.params;

  if (!isValidObjectId(thoughtId)) {
    return res.status(400).json({ message: 'Invalid Thought ID' });
  }

  try {
    const updatedThought = await Thoughts.findByIdAndUpdate(
      thoughtId,
      { $addToSet: { reactions: req.body } },
      { new: true, runValidators: true }
    );

    if (!updatedThought) {
      return res.status(404).json({ message: 'Thought not found' });
    }

    return res.status(200).json(updatedThought);
  } catch (err) {
    console.error('Error adding reaction:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const deleteReaction = async (req: Request, res: Response) => {
  const { thoughtId, reactionId } = req.params;

  if (!isValidObjectId(thoughtId) || !isValidObjectId(reactionId)) {
    return res.status(400).json({ message: 'Invalid ID(s)' });
  }

  try {
    const updatedThought = await Thoughts.findByIdAndUpdate(
      thoughtId,
      { $pull: { reactions: { reactionId: new Types.ObjectId(reactionId) } } },
      { new: true }
    );

    if (!updatedThought) {
      return res.status(404).json({ message: 'Thought not found or no reaction to delete' });
    }

    return res.status(200).json(updatedThought);
  } catch (err) {
    console.error('Error deleting reaction:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};
