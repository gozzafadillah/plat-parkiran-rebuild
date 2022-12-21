import { combineReducers } from "@reduxjs/toolkit";
import plat from "./plats/PlatsSlicer";

const rootReducer = combineReducers({
  plat,
});

export default rootReducer;
