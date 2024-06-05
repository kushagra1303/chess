Assumptions:
Fixed Player Count: Chess is a two-player game.
Turn-Based Mechanics: Players alternate turns.
Persistence: Game state is persisted using MongoDB.
Interface: A web interface is provided using HTML and Tailwind CSS.

APIs Available
User Management API

POST /api/register: Register a new user.
POST /api/login: Login a user and start a session.
Game Management API

POST /api/create-game: Create a new game.
POST /api/join-game: Join an existing game.
GET /api/game-status: Get the current state of the game.
POST /api/move: Make a move in the game.
Game State API

GET /api/game/:id: Get the game state by game ID.
POST /api/game/:id/move: Post a move to the game by game ID.
Game Objects
User: Represents a player.

Attributes: username, password, email
Game: Represents a chess game.

Attributes: game_id, player1, player2, state, turn, winner
Move: Represents a move in the game.

Attributes: game_id, player, from_position, to_position, piece
MongoDB Schema
Users Collection

Document: { "username": "user1", "password": "hashed_password", "email": "user1@example.com" }
Games Collection

Document: { "game_id": "1234", "player1": "user1", "player2": "user2", "state": "FEN_string", "turn": "player1", "winner": null }