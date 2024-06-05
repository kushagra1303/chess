document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');
    const createGameForm = document.getElementById('createGameForm');
    const joinGameForm = document.getElementById('joinGameForm');
    const boardElement = document.getElementById('board');

    const baseURL = 'http://localhost:5000/api'; // Update this to your server URL

    registerForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const username = document.getElementById('regUsername').value;
        const email = document.getElementById('regEmail').value;
        const password = document.getElementById('regPassword').value;

        const response = await fetch(`${baseURL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password })
        });
        const result = await response.json();
        alert(result.message || result.error);
    });

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;

        const response = await fetch(`${baseURL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        const result = await response.json();
        alert(result.message || result.error);
    });

    createGameForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const response = await fetch(`${baseURL}/create-game`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ player1: 'currentUser' }) // Replace 'currentUser' with actual username
        });
        const result = await response.json();
        alert(result.message || result.error);
    });

    joinGameForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const gameId = document.getElementById('joinGameId').value;

        const response = await fetch(`${baseURL}/join-game`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ game_id: gameId, player2: 'currentUser' }) // Replace 'currentUser' with actual username
        });
        const result = await response.json();
        alert(result.message || result.error);
    });

    function renderBoard(fen) {
        // Example: Render an empty board
        const boardHTML = `
            <div class="square white"></div><div class="square black"></div>
            <div class="square white"></div><div class="square black"></div>
            <div class="square white"></div><div class="square black"></div>
            <div class="square white"></div><div class="square black"></div>
            <div class="square black"></div><div class="square white"></div>
            <div class="square black"></div><div class="square white"></div>
            <div class="square black"></div><div class="square white"></div>
            <div class="square black"></div><div class="square white"></div>
        `;
        boardElement.innerHTML = boardHTML;
    }

    // Fetch and render the board initially
    renderBoard();

    document.getElementById('resetBoard').addEventListener('click', () => {
        renderBoard();
    });
});
