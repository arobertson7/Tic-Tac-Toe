const gameBoard = (function() {
    const board = new Array(9).fill("");
    let containsWin = false; // refers to whether or not the board currently contains a winning pattern
    let containsTie = false;

    // takes letter (X or O) and places it in position if position is open. returns true if placed, false otherwise
    function insertMark(letter, position) {
        if ((position < 9 && position >= 0) && (board[position] == "") && (letter == 'X' || letter == 'O')) {
            board[position] = letter;
            lookForWin();
            return true;
        }
        return false;
    }

    function clearBoard() {
        for (let i = 0; i < 9; i++) {
            board[i] = "";
        }
        containsWin = false;
        containsTie = false;
    }

    // void function to check for a win or a tie / changes bool variable containsWin or containsTie if found
    function lookForWin() {
        let totalCount = 0; // to check for full board (tie)
        let xCount = 0;
        let oCount = 0;
        let winningIndices = [];
        
        // check rows
        for (let i = 0; i < 9; i++) {
            // resets indiviual counts on each new row, total count persists to check for full board (tie)
            if (i % 3 == 0) {
                xCount = 0;
                oCount = 0;
            }

            if (board[i] == "X") { xCount++; totalCount++;}
            if (board[i] == "O") { oCount++; totalCount++;}

            if (xCount == 3) {
                containsWin = true;
                return;
            }
            else if (oCount == 3) {
                containsWin = true;
                return;
            }
        }

        // check columns
        for (let i = 0; i < 3; i++) {
            xCount = 0;
            oCount = 0;
            for (let j = i; j < 9; j += 3) { // 0,3,6    1,4,7     2,5,8   are winning col combos
                if (board[j] == "X") { xCount++;}
                if (board[j] == "O") { oCount++;}
            }

            if (xCount == 3) {
                containsWin = true;
                return;
            }
            else if (oCount == 3) {
                containsWin = true;
                return;
            }
        }
        xCount = 0;
        oCount = 0;

        // check diagonals
        // (0,4,8)
        for (let i = 0; i < 9; i += 4) {
            if (board[i] == "X") { xCount++;}
            if (board[i] == "O") { oCount++;}
        }
        if (xCount == 3) {
            containsWin = true;
            return;
        }
        else if (oCount == 3) {
            containsWin = true;
            return;
        }
        xCount = 0;
        oCount = 0;
        // (2,4,6)
        for (let i = 2; i < 7; i += 2) {
            if (board[i] == "X") { xCount++;}
            if (board[i] == "O") { oCount++;}
        }
        if (xCount == 3) {
            containsWin = true;
            return;
        }
        else if (oCount == 3) {
            containsWin = true;
            return;
        }

        // Lastly, if board was full board but no win found, we have a tie
        if (totalCount == 9) {
            containsTie = true;
        }
    }

    // returns the index which should be played or -1 if no winning (or blocking) choice was found
    function getComputerChoice(computerMark) {
        let pathIndices = [];
        let computerCount = 0;
        let playerCount = 0;

        //search rows
        for (let i = 0; i < 9; i++) {
            if (i % 3 == 0) {
                computerCount = 0;
                playerCount = 0;
                pathIndices = [];
            }

            if (board[i] == computerMark) {
                computerCount++;
            }
            else if (board[i] != "") {
   
                playerCount++;
            }
            pathIndices.push(i);

            if (computerCount == 2 && playerCount == 0 && (i == 2 || i == 5 || i == 8)) {
                for (let j = 0; j < pathIndices.length; j++) {
                    if (board[pathIndices[j]] == "") {
                        return pathIndices[j];
                    }
                }
            }
        }

        //search columns
        for (let i = 0; i < 3; i++) {
            computerCount = 0;
            playerCount = 0;
            pathIndices = [];

            for (let j = i; j < 9; j += 3) { // 0,3,6    1,4,7     2,5,8   are winning col combos
                if (board[j] == computerMark) {
                    computerCount++;
                }
                else if (board[j] != "") {
                    playerCount++;
                }
                pathIndices.push(j);
            }

            if (computerCount == 2 && playerCount == 0) {
                for (let j = 0; j < pathIndices.length; j++) {
                    if (board[pathIndices[j]] == "") {
                        return pathIndices[j];
                    }
                }
            }
        }

        // search diagonals
        // (0,4,8)
        computerCount = 0;
        playerCount = 0;
        pathIndices = [];
        for (let i = 0; i < 9; i += 4) {
            if (board[i] == computerMark) {
                computerCount++;
            }
            else if (!board[i] == "") {
                playerCount++;
            }
            pathIndices.push(i);
        }
        if (computerCount == 2 && playerCount == 0) {
            for (let j = 0; j < pathIndices.length; j++) {
                if (board[pathIndices[j]] == "") {
                    return pathIndices[j];
                }
            }
        }

        computerCount = 0;
        playerCount = 0;
        pathIndices = [];
        // (2,4,6)
        for (let i = 2; i < 7; i += 2) {
            if (board[i] == computerMark) {
                computerCount++;
            }
            else if (!board[i] == "") {
                playerCount++;
            }
            pathIndices.push(i);
        }
        if (computerCount == 2 && playerCount == 0) {
            for (let j = 0; j < pathIndices.length; j++) {
                if (board[pathIndices[j]] == "") {
                    return pathIndices[j];
                }
            }
        }
        return -1;
    }

    function checkForWin() {
        return containsWin;
    }

    function checkForTie() {
        return containsTie;
    }

    return {insertMark, clearBoard, checkForWin, checkForTie, getComputerChoice};
})();


function createPlayer(name_) {
    const name = name_.charAt(0).toUpperCase() + name_.slice(1);
    let marker = "";
    let isComputer = false;

    const getName = function() {
        return name;
    }

    const setMarker = function(marker_) {
        marker = marker_;
    }

    const getMarker = function() {
        return marker;
    }

    function setIsComputer(trueOrFalse) {
        isComputer = trueOrFalse;
    }

    function getIsComputer() {
        return isComputer;
    }

    return {getName, setMarker, getMarker, setIsComputer, getIsComputer};
}


const gameController = (function() {
    let playerOne;
    let playerTwo;
    let turnNumber;
    // variable to keep track of game mode (solo or multiplayer)
    let gameMode;

    function initializePlayers() {
        // Randomize player's markers
        let markerCoinFlip = Math.floor(Math.random() * 2);
        switch(true) {
            case (markerCoinFlip == 0):
                temp = playerOne;
                playerOne = playerTwo;
                playerTwo = temp;
                playerOne.setMarker("O");
                playerTwo.setMarker("X");
                break;
            case (markerCoinFlip == 1):
                playerOne.setMarker("X");
                playerTwo.setMarker("O");
                break;
        }
    }
    
    function playGame() {
        initializePlayers();
        displayController.clearDisplay();
        displayController.generateFreshBoard();
        turnNumber = 0;
        nextTurn(); // start first turn
    }

    function nextTurn() {
        turnNumber++;
        const player = getWhoseTurn();
        // next turn
        if (!gameBoard.checkForWin() && !gameBoard.checkForTie()) {
            displayController.displayPlayerTurn(player, turnNumber);
            if (player.getIsComputer()) {
                displayController.playComputerTurn(player);
            }
        }
        else { // game over
            turnNumber--;
            displayController.displayResult();
        }
    }

    // returns the player object of whose turn it is
    function getWhoseTurn() {
        if (turnNumber % 2 == 1) {
            return playerOne;
        }
        else {
            return playerTwo;
        }
    }

    function assignPlayer(player, playerNumber) {
        if (playerNumber == 1) {
            playerOne = player;
        }
        else if (playerNumber == 2) {
            playerTwo = player
        }
    }

    function generateRandomOpponent() {
        const namesArray = ["Sven", "Eden", "Ludwig", "Max", "Lena", "Hector", "Helga", "Bjørn"];
        let nameIndex = Math.floor(Math.random() * namesArray.length);
        const opponent = createPlayer(namesArray[nameIndex]);
        gameController.assignPlayer(opponent, 2);
        return opponent;
    }

    // mode string param can be either "solo" or "multiplayer"
    function setGameMode(mode) {
        gameMode = mode;
    }

    function getGameMode() {
        return gameMode;
    }

    return {playGame, getWhoseTurn, nextTurn, assignPlayer, setGameMode, generateRandomOpponent, getGameMode};
})();


const displayController = (function() {
    const display = document.querySelector(".display");
    const header = document.querySelector(".header");
    const header1 = document.querySelector(".header1");
    const header2 = document.querySelector(".header2");
    const header3 = document.querySelector(".header3");


    function clearDisplay() {
        const elements = display.childNodes;
        for (let i = elements.length - 1; i >= 0; i--) {
            display.removeChild(elements[i]);
        }
    }

    function generateFreshBoard() {
        if (display.childNodes.length != 0) { // display must first be empty
            return;
        }
        clearDisplay();
        const board = document.createElement("div");
        board.classList.add("board");
        for (let i = 0; i < 9; i++) {
            const box = document.createElement("div");
            box.classList.add("box");
            box.classList.add(i); // reference to box index
            box.classList.add("available-box");
            box.addEventListener("click", handleBoxSelection);
            board.appendChild(box);
        }
        display.appendChild(board);
    }

    function getMarkerColor(mark) {
        if (mark == "X") {
            return "rgb(13, 103, 167)";
        }
        else if (mark == "O") {
            return "rgb(161, 10, 10)";
        }
    }

    function placeMark(mark, position) {
        const board = document.querySelector(".board");
        board.childNodes[position].textContent = mark;
        board.childNodes[position].style.color = getMarkerColor(mark);
    }

    function displayPlayerTurn(player, turnNumber) {
        if (turnNumber == 1) {
            header1.textContent = `${player.getName()}`;
            header1.style.color = getMarkerColor(player.getMarker());
            header2.textContent = ", take it away! ";
            header3.textContent = ` (${player.getMarker()}'s)`;
            header3.style.color = getMarkerColor(player.getMarker());
        }
        else {
            header1.textContent = `${player.getName()}`;
            header1.style.color = getMarkerColor(player.getMarker());
            header2.textContent = ", your turn! ";
            if (player.isComputer) {
                header2.textContent = "'s turn!";
            }
            header3.textContent = ` (${player.getMarker()}'s)`;
            header3.style.color = getMarkerColor(player.getMarker());
        }
    }

    function handleBoxSelection() {
        const position = this.classList[1]; // index of selected box
        const player = gameController.getWhoseTurn();
        if (gameBoard.insertMark(player.getMarker(), position)) {
            placeMark(player.getMarker(), position);
            this.removeEventListener("click", handleBoxSelection);
            this.classList.remove("available-box");
            gameController.nextTurn();
        }
    }

    function displayResult() {
        header3.textContent = "";
        if (gameBoard.checkForWin()) {
            // remove ability to click more boxes
            const boxes = document.querySelectorAll(".box");
            for (let i = 0; i < boxes.length; i++) {
                if (boxes[i].textContent == "") {
                    boxes[i].removeEventListener("click", handleBoxSelection);
                    boxes[i].classList.remove("available-box");
                }
            }
            // display winner
            const player = gameController.getWhoseTurn();
            header1.textContent = `${player.getName()} `;
            header1.style.color = getMarkerColor(player.getMarker());
            header2.textContent = "is the winner!";
            // green background light up
            display.style.backgroundColor = "rgb(23, 200, 85)";
            header.style.backgroundColor = "rgb(23, 200, 85)";
            for (let i = 0; i < boxes.length; i++) {
                boxes[i].classList.add("boxes-color-transition");
                boxes[i].style.color = "white";
            }

            setTimeout(() => {
                display.style.backgroundColor = "white";
                header.style.backgroundColor = "white";
                for (let i = 0; i < boxes.length; i++) {
                    boxes[i].style.color = getMarkerColor(boxes[i].textContent);
                }
            }, 2300);
        }
        else if (gameBoard.checkForTie()) {
            header2.textContent = "";
            header1.textContent = "It's a draw!";
            header1.style.color = "rgb(74, 14, 195)"
        }
        
        const playAgainButton = document.createElement("button");
        playAgainButton.classList.add("play-again-button");
        playAgainButton.textContent = "Play Again";
        playAgainButton.addEventListener("click", () => {
            gameBoard.clearBoard();
            

            header2.style.color = "black";
            gameController.playGame();
        });
        setTimeout(() => {
            display.appendChild(playAgainButton);
        }, 3000);
    }

    // param is an int (1 or 2)
    function getPlayerInfo(playerNumber) {
        displayController.clearDisplay();

        const playerInfoForm = document.createElement("div");
        playerInfoForm.classList.add("player-info-form");
        const message = document.createElement("h2");
        message.style.fontWeight = "550";
        if (gameController.getGameMode() == "multiplayer") {
            message.textContent = `Player ${playerNumber}, enter your name: `;
        }
        else {
            message.textContent = `Enter your name: `;
        }
        const input = document.createElement("input");
        input.id = "playerNameInputField";
        input["maxLength"] = "8";
        const submitButton = document.createElement("button");
        submitButton.textContent = "Go ->";
        playerInfoForm.appendChild(message);
        playerInfoForm.appendChild(input);
        playerInfoForm.appendChild(submitButton);
        display.appendChild(playerInfoForm);
        input.focus();
        submitButton.addEventListener("click", () => {
            if (input.value != "") {
                handlePlayerNameInput(playerNumber);
            }
            else {
                input.focus();
            }
        })
        document.addEventListener("keydown", keyDownHandler);
        function keyDownHandler(event) {
            if (event.key == "Enter") {
                const inputField = document.getElementById("playerNameInputField");
                if (inputField.value != "") {
                    handlePlayerNameInput(playerNumber);
                    document.removeEventListener("keydown", keyDownHandler);
                }
            }
        }
    }

    function handlePlayerNameInput(playerNumber) {
        const playerName = document.getElementById("playerNameInputField").value;
        const player = createPlayer(playerName);
        gameController.assignPlayer(player, playerNumber);
        if (playerNumber == 1) {
            if (gameController.getGameMode() == "multiplayer") {
                getPlayerInfo(2);
            }
            else { // solo mode
                let opponent = gameController.generateRandomOpponent();
                opponent.setIsComputer(true);

                // show match up
                displayController.clearDisplay();
                const matchupDisplay = document.createElement("div");
                matchupDisplay.id = "matchup-display";
                const matchupName1 =  document.createElement("h1");
                const matchupVs = document.createElement("h1");
                const matchupName2 =  document.createElement("h1");
                matchupDisplay.appendChild(matchupName1);
                matchupDisplay.appendChild(matchupVs);
                matchupDisplay.appendChild(matchupName2);
                display.appendChild(matchupDisplay);
                matchupName1.textContent = `${player.getName()}`;
                matchupName1.style.color = getMarkerColor("X");
                matchupVs.textContent = " vs. ";
                matchupVs.style.color = "rgb(48, 48, 48)";
                matchupName2.textContent = `${opponent.getName()}!`;
                matchupName2.style.color = getMarkerColor("O");

                setTimeout(() => {
                    gameController.playGame()
                }, 2250);
            }
        }
        else {
            gameController.playGame();
        }
    }

    function playComputerTurn(computerPlayer) {
        // temporarily disable box clicks
        const boxes = document.querySelectorAll(".box");
        for (let i = 0; i < boxes.length; i++) {
            if (boxes[i].textContent == "") {
                boxes[i].removeEventListener("click", handleBoxSelection);
                boxes[i].classList.remove("available-box");
            }
        }

        // look for winning choice
        let selectedBoxIndex = gameBoard.getComputerChoice(computerPlayer.getMarker());
        // if none, look for blocking choice
        if (selectedBoxIndex == -1) {
            let playerMark;
            if (computerPlayer.getMarker() == "X") {
                playerMark = "O";
            }
            else {
                playerMark = "X";
            }
            selectedBoxIndex = gameBoard.getComputerChoice(playerMark);
        }
        // if no choice was found above, the below will randomize the choice; else it will just go ahead and insert the choice found above
        while (!gameBoard.insertMark(computerPlayer.getMarker(), selectedBoxIndex)) {
            selectedBoxIndex = Math.floor(Math.random() * 9);
        }

        setTimeout(() => {
            placeMark(computerPlayer.getMarker(), selectedBoxIndex);
            // re-add event listeners for available boxes
            for (let i = 0; i < boxes.length; i++) {
                if (boxes[i].textContent == "") {
                    boxes[i].addEventListener("click", handleBoxSelection);
                    boxes[i].classList.add("available-box");
                }
            }
            gameController.nextTurn();
        }, 2000);
    }

    function displayGameModes() {
        clearDisplay();
        const gameModesDisplay = document.createElement("div");
        gameModesDisplay.id = "game-modes-display";
        const soloButton = document.createElement("button");
        soloButton.textContent = "Single player";
        const multiplayerButton = document.createElement("button");
        multiplayerButton.textContent = "2 players";
        gameModesDisplay.appendChild(soloButton);
        gameModesDisplay.appendChild(multiplayerButton);
        display.appendChild(gameModesDisplay);

        soloButton.addEventListener("click", () => {
            gameController.setGameMode("solo");
            displayController.getPlayerInfo(1);
        })

        multiplayerButton.addEventListener("click", () => {
            gameController.setGameMode("multiplayer");
            displayController.getPlayerInfo(1);
        })
    }

    return {clearDisplay, generateFreshBoard, placeMark, displayPlayerTurn, displayResult, getPlayerInfo, playComputerTurn, displayGameModes};
})();


const playGameButton = document.querySelector(".play-game-button");
playGameButton.addEventListener("click", () => {
    displayController.displayGameModes();
    // displayController.getPlayerInfo(1);
    // gameController.setGameMode("solo");
})

