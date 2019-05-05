import { combineReducers } from "redux";
import deckReducer from "./deckReducer";
import deckDetailReducer from "./deckDetailReducer";

export default combineReducers({
  deckReducer,
  deckDetailReducer
});
