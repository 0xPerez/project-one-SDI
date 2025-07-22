// used to handle Deck of Cards API

const apiURL = 'https://deckofcardsapi.com';

// creates new deck and id
export async function createDeck() {
  const response = await fetch(`${apiURL}/api/deck/new/shuffle/?deck_count=1`);
  const data = await response.json();
  return data.deck_id;
}

export async function drawCards(deckId, count = 1) {
  const response = await fetch(`${apiURL}/deck/${deckId}/draw/?count=${count}`);
  const data = await response.json();
  return data.cards;
}
