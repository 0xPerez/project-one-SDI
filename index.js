// TODO: HECK WHAT DO I EVEN DO?!?! FIGURE IT OUT AAAAA
import {createDeck, drawCards} from './deck.js';

// TODO: Actual game rules and logic go here
let deckID = '';
let playerHand = [];
let dealerHand = [];
let playerScore = 0;
let dealerScore = 0;
let gameOver = false;

// New Game logic
export async function startNewGame() {
  deckID = await createDeck();  // Creates ID and creates new deck
  playerHand = await drawCards(deckID, 2); // Stores player hand
  dealerHand = await drawCards(deckID, 2); // Stores dealer hand
  gameOver = false; // Checks for gameover
  updateScore(); // Updates Scores
  updateUI(); // Updates UI
  document.getElementById('result').innerText =''; // Spits out who wins
}
// Hit logic
export async function hit() {
  if (!gameOver) { // If we didn't hit game over do this...
    const newCard = await drawCards(deckID, 1);
    playerHand.push(newCard[0]);
    updateScore();
    updateUI();
    bustCheck(); // checks for bust
  }
}
// Stand logic
export async function stand() {
  if (!gameOver) { // If we didn't get game over do this...
    gameOver = true;
    while (dealerScore < 17) {
      const newCard = await drawCards(deckID, 1);
      dealerHand.push(newCard[0]);
      updateScore();
      updateUI();
      if (dealerScore >= 17) { // now check if player or dealer wins
        checkWinner();
      }
    }

  }
}

// Logic for updating scores
function updateScore() {
  playerScore = calculateScore(playerHand);
  dealerScore = calculateScore(dealerHand);
  document.getElementById('player-score').innerText = `${playerScore}`;
  document.getElementById('dealer-score').innerText = `${dealerScore}`;
  // IF THERES FORMATING ISSUES LOOK HERE, THERE MIGHT BE SOMETHING W/ INNER TXT
}

// Logic for calculating scores
function calculateScore(hand) {
  let score = 0;
  let acePresent = false; // look for ace, adjust value if needed
  hand.forEach(card => {
    if (card.value === 'ACE'){
      acePresent = true;
      score += 11;
    } else if (['KING', 'QUEEN', 'JACK'].includes(card.value)) {
      score += 10; // face cards have a value of 10
    } else {
      score += parseInt(card.value);
    }
  });
  if (score > 21 && acePresent) { // prevent bust if ace present
    score -= 10;
  }
  return score;
}
