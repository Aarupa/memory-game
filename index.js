const images = [
    "images/img1.jpg", "images/img2.jpg", "images/img3.jpg", "images/img4.jpg",
    "images/img5.jpg", "images/img6.jpg", "images/img1.jpg", "images/img2.jpg",
    "images/img3.jpg", "images/img4.jpg", "images/img5.jpg", "images/img6.jpg"
];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let moves = 0;
let matchedPairs = 0;
let timer;
let startTime;
let gameStarted = false;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function setupCards() {
    const container = document.querySelector('.container');
    const shuffledImages = shuffle([...images]);
    container.innerHTML = '';
    shuffledImages.forEach((img, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.image = img;
        card.innerHTML = `
            <div class="insidecard">
                <div class="frontcard"></div>
                <div class="backcard"><img src="${img}" alt="Image"></div>
            </div>`;
        container.appendChild(card);
    });
    addCardListeners();
    resetGameStats();
}