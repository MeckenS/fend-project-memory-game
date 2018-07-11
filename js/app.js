
//Create a list that holds all of your cards
const cards = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-anchor",
"fa fa-bolt", "fa fa-bolt", "fa fa-cube", "fa fa-cube", "fa fa-bomb", "fa fa-bomb", "fa fa-leaf", "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle"];



const cardsContainer = document.querySelector(".deck");

let openCards = [];
let matchedCards = [];


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

      //Second Card
      if (openCards.length === 1) {

        newCard.classList.add("open", "show");
        openCards.push(this);

        //Compare Cards
        if (this.innerHTML === openCards[0].innerHTML) {

          this.classList.add("match");
          openCards[0].classList.add("match");

          //push matched cards to matchedCards array
          matchedCards.push(this, openCards[0]);

          openCards = [];

        //not a match
        } else {
          this.classList.remove("open", "show");
          openCards[0].classList.remove("open", "show");

          openCards = [];
        }

      //first Card
      } else {
        newCard.classList.add("open", "show");
        openCards.push(this);

      }

    });

  }
}

function isGameOver () {
  if (matchedCards.length === 16) {
    console.log("You are the Winner!!!")
  } else {

  }
}

createGameBoard();

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
