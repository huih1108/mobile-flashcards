export const GET_DECKS = "GET_DECKS";
export const SET_DECK_DETAIL = "SET_DECK_DETAIL";
export const ADD_DECK = "ADD_DECK";
export const ADD_CARD = "ADD_CARD";

export function getDecks(decks) {
  console.log("getDecks");
  return {
    type: GET_DECKS,
    decks
  };
}

export function addDeck(deck) {
  console.log("addDeck");
  return {
    type: ADD_DECK,
    deck
  };
}

export function addCard(id, card) {
  return {
    type: ADD_CARD,
    card,
    id
  };
}

export function setDeckDetail(detail) {
  console.log("setDeckDetail");

  return {
    type: SET_DECK_DETAIL,
    detail
  };
}
