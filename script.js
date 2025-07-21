'use strict';

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

const diceEl = document.querySelector('.dice'); //Dice Image
const btnNew = document.querySelector('.btn-new'); //New Game Button
const btnRoll = document.querySelector('.btn-roll'); //Roll Dice Button
const btnHold = document.querySelector('.btn-hold'); //Hold Button
const score0El = document.getElementById('score--0'); //Player 1 total score
const score1El = document.getElementById('score--1'); //Player 2 total score
const current0El = document.getElementById('current--0'); //Player 1 current turn score
const current1El = document.getElementById('current--1'); //Player 2 current turn score
const player0El = document.querySelector('.player--0'); //Player 1 section
const player1El = document.querySelector('.player--1'); //Player 2 section

// 🔄 Start conditions
const init = () => {
  scores[0] = 0;
  scores[1] = 0;
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  //.textcontent: This property is used to get or set the text inside an HTML element.

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.style.display = 'none'; //Updates score display to 0 in UI
  
  //Removing winning styling from both players
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active'); //Sets player 1 as the active player
  player1El.classList.remove('player--active'); 


  //Restores player names if they were changes to "Winner!!" earlier
  document.getElementById('name--0').textContent = 'PLAYER 1';
  document.getElementById('name--1').textContent = 'PLAYER 2';
};
init(); //function calling

const switchPlayer = () => {
  //Resets current score shown in UI for the current player
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0; //Switches active player (0 → 1 or 1 → 0)
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// 🎲 Roll Dice
btnRoll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1; //Generates a random number between 1 and 6
    diceEl.src = `Dice-${dice}.jpeg`; //Changes dice image and makes it visible.
    diceEl.style.display = 'block';

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent = currentScore; //Add dice number to the current score and show it in the UI.

      // 🏁 Check for winner immediately
      if (scores[activePlayer] + currentScore >= 25) {
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer]; //Update the final score, end the game, and hide the dice.

        playing = false;
        diceEl.style.display = 'none';

        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        document.getElementById(`name--${activePlayer}`).textContent = '🏆 WINNER!';
      }
    } else {
      switchPlayer();
    }
  }
});

// 🛑 Hold
btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer]; //Add the current score to the total score.

    //If score ≥ 25, end the game
    if (scores[activePlayer] >= 25) {
      playing = false;
      diceEl.style.display = 'none';

      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
      document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
      document.getElementById(`name--${activePlayer}`).textContent = '🏆 WINNER!';
    } else {
      switchPlayer();
    }
  }
});

// 🔄 New Game: Resets everything and restarts the game by calling init() when "NEW GAME" is clicked.
btnNew.addEventListener('click', init);
