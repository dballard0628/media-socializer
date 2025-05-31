import mongoose from 'mongoose';

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/defaultdb';

mongoose.connect(mongoURI);

const db = mongoose.connection;

db.on('error', (error) => console.error('MongoDB connection error:', error));
db.once('open', () => console.log('MongoDB connected'));

export default db;
