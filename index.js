// TODO: HECK WHAT DO I EVEN DO?!?! FIGURE IT OUT AAAAA
import {createDeck, drawCards} from './deck.js';

// TODO: Actual game rules and logic go here
let deckID = '';
let playerHand = [];
let dealerHand = [];
let playerScore = 0;
let dealerScore = 0;
let gameOver = false;
let hideDealerHoleCard = true;

// New Game logic
export async function startNewGame() {
  deckID = await createDeck();  // Creates ID and creates new deck
  playerHand = await drawCards(deckID, 2); // Stores player hand
  dealerHand = await drawCards(deckID, 2); // Stores dealer hand
  gameOver = false; // Checks for gameover
  hideDealerHoleCard = true; // hides dealer card
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
    hideDealerHoleCard = false; // shows dealer hole card
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

// Check for bust logic
function bustCheck() {
  if (playerScore > 21) {
    document.getElementById('result').innerText = 'BUST! YOU LOSE!'
    gameOver = true;
  }
}

// Check for win condition
function checkWinner() {
  if (dealerScore > 21) {
    document.getElementById('result').innerText = 'DEALER BUST! YOU WIN!';
  }else if (playerScore > 21) {
    document.getElementById('result').innerText = 'BUST! YOU LOSE!'
  } else if (dealerScore >= playerScore) {
    document.getElementById('result').innerText = 'DEALER WINS!';
  } else {
    document.getElementById('result').innerText = 'YOU WIN!'
  }
}

// Update UI logic
function updateUI() {
  const playerCardsPre = document.getElementById('player-cards');
  const dealerCardsPre = document.getElementById('dealer-cards');
  playerCardsPre.innerHTML = renderAsciiHand(playerHand);
  dealerCardsPre.innerHTML = renderAsciiHand(dealerHand, hideDealerHoleCard);
  }

// ASCII card template
function getAsciiCard(card) {
  const value = card.value.padEnd(2, ' ').slice(0, 1);
  const suitSymbols = {
    'HEARTS': '♥',
    'DIAMONDS': '♦',
    'CLUBS': '♣',
    'SPADES': '♠'
  };
  const suit = suitSymbols[card.suit] || '?';

  return [
    '┌───────┐',
    `|${value}      |`,
    '|       |',
    `|   ${suit}   |`,
    '|       |',
    `|     ${value} |`,
    '└───────┘'
  ];
}
// Face down card template
function getFaceDownCard() {
  return[
    '┌───────┐',
    '|░░░░░░░|',
    '|░░░░░░░|',
    '|░░░░░░░|',
    '|░░░░░░░|',
    '|░░░░░░░|',
    '└───────┘'
  ];
}

// ASCII card "rendering"
function renderAsciiHand(hand, hideSecondCard = false) {
  const cardLines = hand.map((card, index) => {
    if (hideSecondCard && index === 1) {
      return getFaceDownCard();
    }
    return getAsciiCard(card);
  });

  const finalLines = [];
  for (let i = 0; i < 7; i++) {
    finalLines.push(cardLines.map(card => card[i]).join(' '));
  }

  return finalLines.join('\n');
}
