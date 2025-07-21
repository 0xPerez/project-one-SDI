// TODO: HECK WHAT DO I EVEN DO?!?!

// Get the card API in here
// API should get a new deck
// API should draw a card

// TODO: Actual game rules and logic
let deckID = '';
let playerHand = [];
let dealerHand = [];

// TODO:
// Draw one card face up, have one hidden
// Should update ASCII UI

// TODO: Hit button
// Update when player hits
function drawCard() {
  fetch(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`)
    .then(response => response.json())
    .then(data => {
      const card = data.cards[0];
      playerHand.push(card);
      console.log(`Drew card: ${card.value} of ${card.suit}`);
      // Update UI to show the drawn card
// Draw a new card, update UI

// Check for bust [over >21]

// TODO: Stand button
// Update when player stands
// Dealer draws cards until reaching 17 or higher
// Check for winner

// TODO: Score
// number of cards = value of card
// face cards = 10
// Ace = 1 or 11 [player's choice]
// write a calculateScore(hand) function
// deal with blackjack [21 with two cards]

// TODO: UI stuff
// Show card ASCII using API responses

// Dispaly player and dealer hands scores
// Disable/ enable buttons based on game state
// Display winner

// TODO: game states
// track player and dealer hands
// give you phrases like "You win!", "You lose!", "It's a tie!"
// reset game state when done


