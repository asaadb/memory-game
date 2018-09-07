/*
 * Create a list that holds all of your cards
 */
let initialCards =["fa-diamond","fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb", "fa-diamond","fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb"];
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

let matches = []; // to track the number of matched cards
let cardsClicked = [];
let moves = 0; // tracks the number of moves
let wrongGuesses = 0;
const cards = document.querySelectorAll('.card');

for (const card of cards){

  card.addEventListener('click', function(){

    //check if the card is already in the matches list
    if(!matches.includes(card.firstElementChild.classList[1])){
      if (!card.classList.contains('open')){
        cardsClicked.push(card);
        card.classList.add('open', 'show');
        // if two cards are clicked
        if(cardsClicked.length === 2){
          moves++;
          //console.log(moves);
          // add the move to the html
          document.querySelector('.moves').textContent = moves;
          setTimeout(function (){
            for (const open of cardsClicked){
              checkMatch(cardsClicked);
              open.classList.remove('open', 'show');
            }

            checkWrongGuess();
            cardsClicked = [];
          }, 600);
      //  checkMatch(cardsClicked);

    }
  }
}});
}

/*
* @description: Checks both cards for a match. If matched, it assigns the class 'match'
to both cards.If there is no match, classes 'open' and 'show' are removed
*@param {array} cardsClicked - list of the cards that is clicked
*/

function checkMatch(allCards){
  let firstCard = allCards[0].firstElementChild.classList[1];
  let secondCard = allCards[1].firstElementChild.classList[1];
  if (!matches.includes(firstCard)){

      if( firstCard === secondCard ){
        allCards[0].classList.add('match');
        allCards[1].classList.add('match');
        matches.push(firstCard);
    //if the cards is not in the matches array, add it.


        matchesCompleted();
  }
  else{
    wrongGuesses++;
    console.log("wrong " + wrongGuesses);
  }
}

}

/*
* @description: checks how many wrong guesses were made and update the star rating
*/

function checkWrongGuess(){

  if (wrongGuesses >= 6 && wrongGuesses <= 14){
    document.getElementById('star3').className = 'fa fa-star-o';
  }
  if(wrongGuesses > 14){
    document.getElementById('star2').className = 'fa fa-star-o';
  }
}


/*
* @description: Checks matches array to see if the game is completed
*/

function matchesCompleted(){
  //console.log(matches)
 if(matches.length >= 8){
   setTimeout(function(){
    alert('game is over');
  },700);
  }
}

/*
* @description: restrat the game when the restrat button is clicked. set everything back to the start point and shuffle the cards
*/

function restart(){
  moves = 0;
  matches = [];
  cardsClicked = [];
  wrongGuesses = 0;
  document.getElementById('star3').className = 'fa fa-star';
  document.getElementById('star2').className = 'fa fa-star';
  for (const num of cards){
    num.classList.remove('open', 'show', 'match');

    document.querySelector('.moves').textContent = moves;
  }
  //const stars = document.querySelectorAll('')
  let newCards = shuffle(initialCards);
  for (let i = 0 ; i<newCards.length; i++){
    cards[i].firstElementChild.className = `fa ${newCards[i]}`;
    //console.log(cards[i].firstElementChild.classList[1]);
  }

}

//add event listener to the restart button
const restartBtn = document.querySelector('.fa-repeat');
restartBtn.addEventListener('click', restart);
