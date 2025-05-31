import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/socialnetwork';

mongoose.connect(mongoURI);

const db = mongoose.connection;

export default db;