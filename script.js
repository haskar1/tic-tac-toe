const createPlayer = (marker) => {
    let score = 0;
    
    return {
        marker, 
        score
    };
}


const gameBoard = (() => {
    let board = ['','','','','','','','',''];

    const tiles = document.querySelectorAll('.game-board > div');
    let playerTurnDisplay = document.querySelector('.player-turn-display');
    
    let markerCount = 0;
    const getMarkerCount = () => markerCount;   

    tiles.forEach((tile, index) => {
        tile.addEventListener('mouseenter', (e) => {
            if (e.target.textContent !== "") {
                return;
            }
            
            if (markerCount === 0 || markerCount === 2 || markerCount === 4 || markerCount === 6 || markerCount === 8) {
                e.target.classList.add("X-hover");
                e.target.textContent = "X";
            }
            
            if (markerCount === 1 || markerCount === 3 || markerCount === 5 || markerCount === 7) {
                e.target.classList.add("O-hover");
                e.target.textContent = "O";
            }
        })
        
        tile.addEventListener('mouseleave', (e) => {
            if (e.target.textContent !== "" && !e.target.classList.contains("X-hover") && !e.target.classList.contains("O-hover")) {
                return;
            }
            
            if (markerCount === 0 || markerCount === 2 || markerCount === 4 || markerCount === 6 || markerCount === 8) {
                e.target.classList.remove("X-hover");
                e.target.textContent = '';
            }
            
            if (markerCount === 1 || markerCount === 3 || markerCount === 5 || markerCount === 7) {
                e.target.classList.remove("O-hover");
                e.target.textContent = '';
            }
        })
        
        tile.addEventListener('click', (e) => {         
            if (e.target.textContent !== "" && !e.target.classList.contains("X-hover") && !e.target.classList.contains("O-hover")) {
                return;
            }

            if (markerCount === 0 || markerCount === 2 || markerCount === 4 || markerCount === 6 || markerCount === 8) {
                e.target.classList.remove("X-hover");
                e.target.textContent = "X";
                e.target.classList.add("X");
                board[index] = "X";
                
                markerCount++;
                playerTurnDisplay.textContent = "Player Two's Turn";
                
                if (markerCount >= 4) {
                    gamePlay.checkGameWon(e);
                };
                
                return;
                //Store selected tile class in player 1's object
            }

            if (markerCount === 1 || markerCount === 3 || markerCount === 5 || markerCount === 7) {
                e.target.classList.remove("O-hover");
                e.target.textContent = "O";
                e.target.classList.add("O");
                board[index] = "O";
                
                markerCount++;
                playerTurnDisplay.textContent = "Player One's Turn";
                
                if (markerCount >= 5) {
                    gamePlay.checkGameWon(e);
                };
                
                return;
                //Store selected tile class in player 2's object
            }
        })
    });
    
    const restartBtn = document.querySelector('.restart-button');

    restartBtn.addEventListener('click', () => {
        tiles.forEach((tile, index) => {
            if (tile.classList.contains(tile.textContent)) {
                tile.classList.remove(tile.textContent);
                tile.textContent = '';
            }
            
            tile.style.pointerEvents = "auto";
        })
        
        board = ['','','','','','','','',''];
        markerCount = 0;
        playerTurnDisplay.textContent = "Player One's Turn";
    });

    return {
        tiles, 
        getMarkerCount,
        playerTurnDisplay
    }
})();


const gamePlay = (() => {
    const player1 = createPlayer('X');
    const player2 = createPlayer('O');
       
    function endGame() {
        gameBoard.tiles.forEach(tile => tile.style.pointerEvents = "none");
    }

    function checkGameWon(e) {
        const tileTL = document.querySelector('.tile-top-left');
        const tileTC = document.querySelector('.tile-top-center');
        const tileTR = document.querySelector('.tile-top-right');
        const tileML = document.querySelector('.tile-middle-left');
        const tileMC = document.querySelector('.tile-middle-center');
        const tileMR = document.querySelector('.tile-middle-right');
        const tileBL = document.querySelector('.tile-bottom-left');
        const tileBC = document.querySelector('.tile-bottom-center');
        const tileBR = document.querySelector('.tile-bottom-right');
        
        if (
            // check if three-in-a-row exists
            // top row
            tileTL.classList.contains(e.target.textContent) 
            && tileTC.classList.contains(e.target.textContent) 
            && tileTR.classList.contains(e.target.textContent)
            ||
            // middle row
            tileML.classList.contains(e.target.textContent) 
            && tileMC.classList.contains(e.target.textContent) 
            && tileMR.classList.contains(e.target.textContent)
            ||
            // bottom row
            tileBL.classList.contains(e.target.textContent) 
            && tileBC.classList.contains(e.target.textContent) 
            && tileBR.classList.contains(e.target.textContent)
            ||
            // left column
            tileTL.classList.contains(e.target.textContent) 
            && tileML.classList.contains(e.target.textContent) 
            && tileBL.classList.contains(e.target.textContent)
            ||
            // middle column
            tileTC.classList.contains(e.target.textContent) 
            && tileMC.classList.contains(e.target.textContent) 
            && tileBC.classList.contains(e.target.textContent)
            ||
            // right column
            tileTR.classList.contains(e.target.textContent) 
            && tileMR.classList.contains(e.target.textContent) 
            && tileBR.classList.contains(e.target.textContent)
            ||
            // diagonal from top left to bottom right
            tileTL.classList.contains(e.target.textContent) 
            && tileMC.classList.contains(e.target.textContent) 
            && tileBR.classList.contains(e.target.textContent)
            ||
            // diagonal from top right to bottom left
            tileTR.classList.contains(e.target.textContent) 
            && tileMC.classList.contains(e.target.textContent) 
            && tileBL.classList.contains(e.target.textContent)
        ) {
            if (gameBoard.getMarkerCount() === 5 || gameBoard.getMarkerCount() === 7 || gameBoard.getMarkerCount() === 9) {
                gameBoard.playerTurnDisplay.textContent = "Player One is the Winner!";
                gamePlay.player1.score += 1;
            }
            else {
                gameBoard.playerTurnDisplay.textContent = "Player Two is the Winner!";
                gamePlay.player2.score += 1;
            }
            return endGame();
        }
        
        // tie
        if (gameBoard.getMarkerCount() === 9) {
            gameBoard.playerTurnDisplay.textContent = "The Game is a Tie!";
            return endGame();
        }
    }

    return {
        endGame,
        checkGameWon,
        player1,
        player2
    }
})();
