import { SET_DECK_DETAIL, ADD_CARD } from "../actions/reduxAction";
import uuid from "uuid";

export default function deckDetailReducer(
  state = { id: "", title: "", questions: [] },
  action
) {
  switch (action.type) {
    case SET_DECK_DETAIL:
      console.log("SET_DECK_DETAIL");
      console.log("action.detail", {
        ...state,
        id: action.detail.id,
        title: action.detail.title,
        questions: action.detail.questions
      });
      return {
        ...state,
        id: action.detail.id,
        title: action.detail.title,
        questions: action.detail.questions
      };
    case ADD_CARD:
      return {
        ...state,
        questions: [...state.questions, action.card]
      };
    default:
      console.log("detail default");
      return state;
  }
}
