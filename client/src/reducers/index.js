import { combineReducers } from "redux";
import mainGameReducer from "./mainGameReducer";

export default combineReducers({
  itemsReducerInstance: mainGameReducer
});
