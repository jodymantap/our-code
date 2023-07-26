import { combineReducers } from "@reduxjs/toolkit";
import memberReducer from "./memberReducer";

const reducers = combineReducers({ members: memberReducer });

export default reducers;
