//your JS code here. If required.

const player1Input = document.getElementById("player-1");
const player2Input = document.getElementById("player-2");
const submitButton = document.getElementById("submit");

const playerSection = document.getElementById("player-section");
const gameSection = document.getElementById("game-section");

const message = document.querySelector(".message");
const cells = document.querySelectorAll(".cell");

let player1;
let player2;

let currentPlayer = 1;

let board = ["", "", "", "", "", "", "", "", ""];

let gameOver = false;


// Start the game
submitButton.addEventListener("click", function () {

    player1 = player1Input.value;
    player2 = player2Input.value;

    if (player1 === "" || player2 === "") {
        return;
    }

    playerSection.style.display = "none";
    gameSection.style.display = "block";

    message.innerText = player1 + ", you're up";
});


// Cell click
cells.forEach(function (cell) {

    cell.addEventListener("click", function () {

        if (gameOver) {
            return;
        }

        let position = Number(cell.id);

        // Don't allow an already occupied cell
        if (board[position] !== "") {
            return;
        }

        if (currentPlayer === 1) {

            cell.innerText = "X";
            board[position] = "X";

            if (checkWinner("X")) {
                message.innerText = player1 + " congratulations you won!";
                gameOver = true;
                return;
            }

            currentPlayer = 2;
            message.innerText = player2 + ", you're up";

        } else {

            cell.innerText = "O";
            board[position] = "O";

            if (checkWinner("O")) {
                message.innerText = player2 + " congratulations you won!";
                gameOver = true;
                return;
            }

            currentPlayer = 1;
            message.innerText = player1 + ", you're up";
        }

    });

});


// Check winner
function checkWinner(player) {

    const winningCombinations = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],

        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],

        [1, 5, 9],
        [3, 5, 7]
    ];

    for (let combination of winningCombinations) {

        let a = combination[0];
        let b = combination[1];
        let c = combination[2];

        if (
            board[a] === player &&
            board[b] === player &&
            board[c] === player
        ) {
            return true;
        }
    }

    return false;
}