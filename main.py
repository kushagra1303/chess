# Install necessary libraries
# pip install flask pymongo flask-cors
from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from bson.objectid import ObjectId


app = Flask(__name__)
CORS(app)

client = MongoClient('mongodb://localhost:27017/chess')
db = client['chess_game']
users = db['users']
games = db['games']

@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data['username']
    password = data['password'].encode('utf-8')
    email = data['email']

    if users.find_one({"username": username}):
        return jsonify({"error": "Username already exists"}), 400

    hashed_password = bcrypt.hashpw(password, bcrypt.gensalt())
    users.insert_one({
        "username": username,
        "password": hashed_password,
        "email": email
    })
    return jsonify({"message": "User registered successfully"}), 201

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data['username']
    password = data['password'].encode('utf-8')

    user = users.find_one({"username": username})
    if user and bcrypt.checkpw(password, user['password']):
        return jsonify({"message": "Login successful"}), 200
    return jsonify({"error": "Invalid username or password"}), 401


@app.route('/api/create-game', methods=['POST'])
def create_game():
    data = request.get_json()
    player1 = data['player1']
    game_id = str(ObjectId())
    initial_state = "start_FEN_string"  # Placeholder for the initial FEN string

    games.insert_one({
        "game_id": game_id,
        "player1": player1,
        "player2": None,
        "state": initial_state,
        "turn": player1,
        "winner": None
    })
    return jsonify({"game_id": game_id}), 201

@app.route('/api/join-game', methods=['POST'])
def join_game():
    data = request.get_json()
    game_id = data['game_id']
    player2 = data['player2']

    game = games.find_one({"game_id": game_id})
    if game and not game['player2']:
        games.update_one({"game_id": game_id}, {"$set": {"player2": player2}})
        return jsonify({"message": "Joined game successfully"}), 200
    return jsonify({"error": "Invalid game ID or game already full"}), 400

@app.route('/api/game-status', methods=['GET'])
def game_status():
    game_id = request.args.get('game_id')
    game = games.find_one({"game_id": game_id})
    if game:
        return jsonify({
            "game_id": game['game_id'],
            "player1": game['player1'],
            "player2": game['player2'],
            "state": game['state'],
            "turn": game['turn'],
            "winner": game['winner']
        }), 200
    return jsonify({"error": "Game not found"}), 404
