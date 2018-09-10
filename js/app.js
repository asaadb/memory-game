// Create a list that holds all of your cards
let initialCards =["fa-diamond","fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb", "fa-diamond","fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb"];

/*
* @description: Shuffle function from http://stackoverflow.com/a/2450976
*/

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

// grap the deck cards
const cards = document.querySelectorAll('.card');

/*
* @description: suffle and update the cards
*/

function startGame(){

  let newCards = shuffle(initialCards);
  for (let i = 0 ; i<newCards.length; i++){
    cards[i].firstElementChild.className = `fa ${newCards[i]}`;
  }
}
//shuffle cards onload
window.onload = startGame();

/*
* @description: add event listener to all the cards alowing the card to be flipped when it's cklicked. Only open two cards at the time.
*/

// to track the number of matched cards
let matches = [];
//to track the cards that were clicked
let cardsClicked = [];
// to track the number of moves
let moves = 0;
 //to tracke wrong guesses
let wrongGuesses = 0;


//Loop over all the cards to add evet listerners
for (const card of cards){

  card.addEventListener('click', function(){

    //check if the card is already in the matches list
    if(!matches.includes(card.firstElementChild.classList[1])){
      //check if the card is already open
      if (!card.classList.contains('open')){
        moves++;
        // start the timer on the first move
        startTimer();
        //add to the cardsClicked list
        cardsClicked.push(card);
        //show the card
        card.classList.add('open', 'show');
        //if two cards are open
        if(cardsClicked.length === 2){
          // add the move to the html

          addMove(moves);
          //check and flip
          cardFlip();
        }
      }
    }
  });
}

/*
* @description: start the timer on the first click
*/

function startTimer(){
  if(moves === 1){
    timing();
  }
}

/*
* @description: starts a setTimeout function to run the checkMatch and flip the cards back if no match is found
*/

function cardFlip() {

  setTimeout(function (){

    for (const open of cardsClicked){
      //check if the cards match
      checkMatch(cardsClicked);
      //remove show and open from the two cards
      open.classList.remove('open', 'show');
    }
    //check wrong matches
    checkWrongGuess();
    cardsClicked = [];
  }, 600);
}

/*
* @description: add move to the score panel.
* @param {number} the number of moves
*/

function addMove(moves){
  //check if two cards are flipped to count for one move
  if(moves%2 === 0){
    document.querySelector('.moves').textContent = moves/2;
  }
}

/*
* @description: Checks both cards for a match. If matched, it assigns the class 'match'
to both cards.If there is no match, classes 'open' and 'show' are removed
*@param {array} cardsClicked - list of the cards that is clicked
*/

function checkMatch(allCards){
  //get the first and second cards classes to know if the cards match
  let firstCard = allCards[0].firstElementChild.classList[1];
  let secondCard = allCards[1].firstElementChild.classList[1];
  if (!matches.includes(firstCard)){

      if( firstCard === secondCard ){
        allCards[0].classList.add('match');
        allCards[1].classList.add('match');
        matches.push(firstCard);
        //check if matches are complete
        matchesCompleted();
      }
      else{
        wrongGuesses++;
      }
  }
}

/*
* @description: checks how many wrong guesses were made and update the star rating
*/

function checkWrongGuess(){

  if (wrongGuesses >= 12 && wrongGuesses <= 20){
    document.getElementById('star3').className = 'fa fa-star-o';
  }
  if(wrongGuesses > 20){
    document.getElementById('star2').className = 'fa fa-star-o';
  }
}

/*
* @description: the game timer
*/

let timer = document.querySelector('.timer');
let min = 0;
let sec = 0;
let hr = 0;
let watchInterval;

function timing() {

  watchInterval = setInterval(function(){
    timer.textContent = `${min} min:${sec} sec`;
    sec++;
    if (sec >= 60){
      sec = 0;
      min++;
    }
  },1000);
}

/*
* @description: restrat the game when the restrat button is clicked. set everything back to the start point and shuffle the cards
*/

function restart(){

  moves = 0;
  matches = [];
  cardsClicked = [];
  wrongGuesses = 0;
  //stop the timer
  clearInterval(watchInterval);
  min = 0;
  sec = 0;
  timer.textContent = `${min} min:${sec} sec`;
  // reset the rating
  document.getElementById('star3').className = 'fa fa-star';
  document.getElementById('star2').className = 'fa fa-star';
  //reset the cards
  for (const num of cards){

    num.classList.remove('open', 'show', 'match');
    document.querySelector('.moves').textContent = moves;

  }
  //new shuffle to restart the game
  startGame();
}


//add event listener to the restart button
const restartBtn = document.querySelector('.fa-repeat');
restartBtn.addEventListener('click', restart);

/*
* @description: Checks matches array to see if the game is completed
*/

function matchesCompleted(){

  if(matches.length >= 8){
    setTimeout(function(){
      //stop the timer
      clearInterval(watchInterval);
      //get the final results
      let finalMoves = document.querySelector('.moves').textContent;
      let finalStars = document.querySelectorAll('.fa-star');
      let finalTime = document.querySelector('.timer').textContent;
      //fire the popup
      swal({
        title: "Good job! You won!",
        text: `With  ${finalMoves} moves
        Your time:  ${finalTime}
        Rating:  ${finalStars.length}  stars`,
        icon: "success",
        button: "Play again",
      })
      //restart the game
      .then((will) => restart());

    },700);
  }
}
