
//Create a list that holds all of your cards
const cards = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-anchor",
"fa fa-bolt", "fa fa-bolt", "fa fa-cube", "fa fa-cube", "fa fa-bomb", "fa fa-bomb", "fa fa-leaf", "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle"];



const cardsContainer = document.querySelector(".deck");

let openCards = [];
let matchedCards = [];
let clickedCards = [];



//create Gameboard
function createGameBoard() {
  shuffle(cards);
  for (let i = 0; i < cards.length; i++) {
    const newCard = document.createElement("li");
    newCard.classList.add("card");
    newCard.innerHTML = `<i class = "${cards[i]}"></i>`;
    cardsContainer.appendChild(newCard);

    //card click & .push to openCards array
    newCard.addEventListener("click", function() {

     //keep track of clicked cards to know to start timer
      clickedCards.push(this);

      if (clickedCards.length === 1) {
        setTimer();
      }

      //Second Card
      if (openCards.length === 1) {

        const currentCard = this;
        const previousCard = openCards[0];

        newCard.classList.add("open", "show", "disable");
        openCards.push(currentCard);

        //add a move to counter
        addMove();

        //rate how many moves used
        ratingSystem();

        //Compare Cards
        if (currentCard.innerHTML === previousCard.innerHTML) {

          currentCard.classList.add("match");
          previousCard.classList.add("match");

          //push matched cards to matchedCards array
          matchedCards.push(currentCard, previousCard);

          openCards = [];

          //check if the gmae is won
          isGameOver();

        //not a match
        } else {

          setTimeout (function () {
            currentCard.classList.remove("open", "show", "disable");
            previousCard.classList.remove("open", "show", "disable");
            openCards = [];
          }, 500);

        }

      //first Card
      } else {
        newCard.classList.add("open", "show", "disable");
        openCards.push(this);

      }

    });

  }
}

/*
 * Rating system
 */
const starsContainer = document.querySelector(".stars");

function ratingSystem() {

  switch (moves) {
    case 22:
      starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>
      <li><i class="fa fa-star"></i></li>`;
    break;

    case 30:
      starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>`;
    break;

  }

}
/*
 * Has the game been won
 */
function isGameOver () {
  if (matchedCards.length === cards.length) {
    console.log("You are the Winner!!!")
  }

}

/*
 * add move
 */
movesContainer = document.querySelector(".moves");
let moves = 0;
function addMove() {
  moves++;
  movesContainer.innerHTML = moves;
}
/*
 * restart Game
 */
const restart = document.querySelector(".restart");
restart.addEventListener("click", function() {
  //delete cards
  cardsContainer.innerHTML = "";

  //reload stars
  starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>
  <li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li>`;


  //reload cards
  createGameBoard();

  //delete previous matchedCards
  clickedCards = [];
  matchedCards = [];
  openCards = [];
  moves = 0;
  movesContainer.innerHTML = 0;

  //restart timer
  timerClass.innerHTML = "";
  time = 0;
  clearInterval(setInet);
  if (clickedCards.length === 1) {
    setTimer();
  }

});

/*
 * Game timer
 */
let time = 0;
let setInet;
const timerClass = document.querySelector(".timer");

function setTimer() {
  setInet = setInterval(gameTimer, 1000);
}

function gameTimer() {
  time++;
  timerClass.innerHTML = time;
}


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

createGameBoard();



/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
