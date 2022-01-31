const section = document.querySelector('section');
const playerLivesCount = document.querySelector('span');
let playerLives = 6;

playerLivesCount.textContent = playerLives;

const getData = () => [
    {imgSrc: 'assets/images/beatles.jpeg', name: 'beatles'},
    {imgSrc: 'assets/images/blink182.jpeg', name: 'blink 182'},
    {imgSrc: 'assets/images/fkatwigs.jpeg', name: 'fka twigs'},
    {imgSrc: 'assets/images/fleetwood.jpeg', name: 'fleetwood'},
    {imgSrc: 'assets/images/joy-division.jpeg', name: 'joy division'},
    {imgSrc: 'assets/images/ledzep.jpeg', name: 'led zeppelin'},
    {imgSrc: 'assets/images/metallica.jpeg', name: 'metallica'},
    {imgSrc: 'assets/images/pinkfloyd.jpeg', name: 'pink floyd'},
    {imgSrc: 'assets/images/beatles.jpeg', name: 'beatles'},
    {imgSrc: 'assets/images/blink182.jpeg', name: 'blink 182'},
    {imgSrc: 'assets/images/fkatwigs.jpeg', name: 'fka twigs'},
    {imgSrc: 'assets/images/fleetwood.jpeg', name: 'fleetwood'},
    {imgSrc: 'assets/images/joy-division.jpeg', name: 'joy division'},
    {imgSrc: 'assets/images/ledzep.jpeg', name: 'led zeppelin'},
    {imgSrc: 'assets/images/metallica.jpeg', name: 'metallica'},
    {imgSrc: 'assets/images/pinkfloyd.jpeg', name: 'pink floyd'}
];

// randomize cards
const randomize = () => {
    const cardData = getData();
    cardData.sort(() => Math.random() - 0.5);
    return cardData;
}

// Card generator function
const cardGenerator = () => {
    const cardData = randomize();
    // generate HTML
    cardData.forEach(item => {
        const card = document.createElement('div');
        const face = document.createElement('img');
        const back = document.createElement('div');
        card.classList = 'card';
        face.classList = 'face';
        back.classList = 'back';
        // attach info to cards
        face.src = item.imgSrc;
        card.setAttribute('name', item.name);
        // attach cards to section
        section.appendChild(card);
        card.appendChild(face);
        card.appendChild(back);
        card.addEventListener('click', (e) => {
            card.classList.toggle('toggleCard');
            checkCards(e);
        });
    });
};

// check cards
const checkCards = (e) => {
    console.log(e);
    const clickedCard = e.target
    clickedCard.classList.add('flipped');
    const flippedCards = document.querySelectorAll('.flipped');
    const toggleCard = document.querySelectorAll('.toggleCard');
    console.log(flippedCards);
    // Logic
    if (flippedCards.length === 2){
        if(
            flippedCards[0].getAttribute('name') ===
            flippedCards[1].getAttribute('name')
        ) {
            console.log('match');
            flippedCards.forEach(card => {
                card.classList.remove('flipped');
                card.style.pointerEvents = 'none';
            })
        } else {
            console.log('wrong');
            flippedCards.forEach(card => {
                card.classList.remove('flipped');
                setTimeout(() => {
                    card.classList.remove('toggleCard')
                }, 1000);
            })
            playerLives--;
            playerLivesCount.textContent = playerLives;
            if(playerLives===0) {
                restart("Soz...try again");
            }
        }
    }
    // RUn a check to see if we won the game
    if(toggleCard.length === 16){
        restart("Woah, you won!");
    }
};

// Restart
const restart = (text) => {
    let cardData = randomize();
    let faces = document.querySelectorAll('.face');
    let cards = document.querySelectorAll('.card');
    section.style.pointerEvents = 'none';
    cardData.forEach((item, index) => {
        cards[index].classList.remove('toggleCard');
        // Randomize
        setTimeout(() => {
            cards[index].style.pointerEvents = 'all';
            faces[index].src = item.imgSrc;
            cards[index].setAttribute('name', item.name);
            section.style.pointerEvents = 'all';
        }, 1000);
    });
    playerLives = 6;
    playerLivesCount.textContent = playerLives;
    setTimeout(() => window.alert(text), 100);
};

cardGenerator();