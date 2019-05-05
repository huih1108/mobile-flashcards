import { GET_DECKS, ADD_DECK, ADD_CARD } from "../actions/reduxAction";
import uuid from "uuid";

export default function deckReducer(state = {}, action) {
  switch (action.type) {
    case GET_DECKS:
      console.log("GET_DECKS");
      return { ...state, ...action.decks };
    case ADD_DECK:
      console.log("ADD_DECKS");
      console.log({ ...state, [action.deck.id]: action.deck });
      return { ...state, [action.deck.id]: action.deck };
    case ADD_CARD:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          questions: [...state[action.id].questions, action.card]
        }
      };
    default:
      console.log("default");
      console.log("default state", state);
      return state;
  }
}
