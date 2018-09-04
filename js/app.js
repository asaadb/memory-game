/*
 * Create a list that holds all of your cards
 */

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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


/*
* @description: add event listener to all the cards alowing the card to be flipped when it's cklicked. Only open two cards at the time.
*/


let cardsClicked = [];
const cards = document.querySelectorAll('.card');

for (const card of cards){
  card.addEventListener('click', function(){

    // if two cards are clicked
    if(cardsClicked.length === 1){
      cardsClicked.push(card);
      checkMatch(cardsClicked);
      cardsClicked = [];
      card.classList.add('open', 'show');

      //console.log(cardsClicked);
      cardsClicked.push(card);
      }
      // if one card is clicked
    else{

      card.classList.add('open', 'show');
      cardsClicked.push(card);
      //console.log(cardsClicked);
    }

});
}

/*

* @description: Checks both cards for a match. If matched, it assigns the class 'match'
to both cards.If there is no match, classes 'open' and 'show' are removed
@param {array} cardsClicked - list of the cards that is clicked

*/

function checkMatch(allCards){
let firstCard = allCards[0].firstElementChild.classList[1];
let secondCard = allCards[1].firstElementChild.classList[1];
if( firstCard === secondCard){
  allCards[0].classList.add('match');
  allCards[1].classList.add('match');


}
else{
  cardsClicked[0].classList.remove('open', 'show');
  cardsClicked[1].classList.remove('open', 'show');
}
}
