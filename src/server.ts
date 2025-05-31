import express from 'express';
import db from './config/connection.js';
import routes from './routes/api/index.js';

const cwd = process.cwd();

const PORT = 3001;
const app = express();

// Note: not necessary for the Express server to function. This just helps indicate what activity's server is running in the terminal.
const activity = cwd.includes('01-Activities')
  ? cwd.split('01-Activities')[1]
  : cwd;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

console.log('Starting server setup...');

db.once('open', () => {
  console.log('Database connection is open');
  app.listen(PORT, () => {
    console.log(`API server for ${activity} running on port ${PORT}!`);
  });
});

db.on('error', (err) => {
  console.error('Database connection error:', err);
});

db.on('disconnected', () => {
  console.log('Database connection has been disconnected');
});