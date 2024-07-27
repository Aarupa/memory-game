document.addEventListener("DOMContentLoaded", () => {
    function addCardListeners() {
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.addEventListener('click', flipCard);
        });
    }

    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;

        if (!gameStarted) {
            startTimer();
            gameStarted = true;
        }

        this.querySelector('.insidecard').classList.add('flipped');

        if (!firstCard) {
            firstCard = this;
        } else {
            secondCard = this;
            moves++;
            updateMoves();
            checkForMatch();
        }
    }

    function checkForMatch() {
        const isMatch = firstCard.dataset.image === secondCard.dataset.image;

        if (isMatch) {
            disableCards();
        } else {
            unflipCards();
        }
    }

    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        resetBoard();
        matchedPairs++;
        if (matchedPairs === images.length / 2) {
            stopTimer();
            celebrateWin(); // Celebrate win when all pairs are matched
        }
    }

    function unflipCards() {
        lockBoard = true;
        setTimeout(() => {
            firstCard.querySelector('.insidecard').classList.remove('flipped');
            secondCard.querySelector('.insidecard').classList.remove('flipped');
            resetBoard();
        }, 1500);
    }

    function resetBoard() {
        [firstCard, secondCard] = [null, null];
        lockBoard = false;
    }

    function resetGameStats() {
        moves = 0;
        matchedPairs = 0;
        updateMoves();
        resetTimer();
        gameStarted = false;
    }

    function updateMoves() {
        document.getElementById('moves').textContent = `Moves: ${moves}`;
    }

    function startTimer() {
        startTime = new Date();
        timer = setInterval(updateTimer, 1000);
    }

    function updateTimer() {
        const currentTime = new Date();
        const elapsedTime = Math.floor((currentTime - startTime) / 1000);
        document.getElementById('timer').textContent = `Time: ${elapsedTime}s`;
    }

    function stopTimer() {
        clearInterval(timer);
    }

    function resetTimer() {
        stopTimer();
        document.getElementById('timer').textContent = 'Time: 0s';
    }

    function celebrateWin() {
        // Hide the grid and controls
        document.querySelector('.container').style.display = 'none';
        document.querySelectorAll('.moves').forEach(button => button.style.display = 'none');
        
        // Create and display win message
        const winMessage = document.createElement('div');
        winMessage.className = 'win-message';
        const elapsedTime = Math.floor((new Date() - startTime) / 1000);
        winMessage.innerHTML = `
            <h1>You Won!</h1>
            <p>Moves: ${moves}</p>
            <p>Time: ${elapsedTime}s</p>
            <button id="restart-game">Restart Game</button>
        `;
        document.body.appendChild(winMessage);

        // Add event listener to restart button
        document.getElementById('restart-game').addEventListener('click', () => {
            document.body.removeChild(winMessage);
            document.querySelector('.container').style.display = 'grid';
            document.querySelectorAll('.moves').forEach(button => button.style.display = 'inline-block');
            setupCards();
        });
    }

    document.getElementById('restart').addEventListener('click', setupCards);
    document.getElementById('cancel').addEventListener('click', () => {
        stopTimer();
        resetGameStats();
        setupCards();
    });
});
   
    