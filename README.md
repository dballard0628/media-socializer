# media-socializer

## Description
This project is a RESTful API for a social network web application built with Express.js, MongoDB, and Mongoose. It allows users to share thoughts, react to friends' thoughts, and manage friend lists.

---

## Features

- **User Management:** Create, read, update, and delete users.
- **Thought Management:** Create, read, update, and delete thoughts.
- **Reactions:** Add and remove reactions to thoughts.
- **Friends:** Add and remove friends from a user's friend list.
- Fully tested API routes via Insomnia or similar API testing tools.

---

## Installation

1. Clone the repository:

   ```bash
   git clone <media-socializer>

## Usage
Starting the Application
Run the command below to start the server and connect to MongoDB:
npm run start:dev

API Endpoints and Testing
Use API testing tools like Insomnia or Postman to test the following routes:

GET /api/users
Returns all users in JSON format.

GET /api/thoughts
Returns all thoughts in JSON format.

POST /api/users
Creates a new user.

PUT /api/users/:id
Updates an existing user by ID.

DELETE /api/users/:id
Deletes a user by ID.

POST /api/thoughts
Creates a new thought.

PUT /api/thoughts/:id
Updates a thought by ID.

DELETE /api/thoughts/:id
Deletes a thought by ID.

POST /api/thoughts/:thoughtId/reactions
Adds a reaction to a thought.

DELETE /api/thoughts/:thoughtId/reactions/:reactionId
Removes a reaction from a thought.

POST /api/users/:userId/friends/:friendId
Adds a friend to a user's friend list.

DELETE /api/users/:userId/friends/:friendId
Removes a friend from a user's friend list.

Acceptance Criteria Met
Server starts successfully and connects to MongoDB.

GET requests for users and thoughts return formatted JSON data.

POST, PUT, and DELETE routes work correctly for creating, updating, and deleting users and thoughts.

POST and DELETE routes allow adding/removing reactions and managing friends in the user's friend list.

## Technologies Used
Node.js

Express.js

MongoDB

Mongoose ODM

JavaScript (TypeScript compatible)

dotenv for environment variables

## Contact Me

Email: dball@gmai.com
Github: https://github.com/dballard0628/media-socializer