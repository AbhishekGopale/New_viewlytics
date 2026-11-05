import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../reducers/rootReducer";

const rootStore = createStore(rootReducer, applyMiddleware(thunk));

export const store = rootStore;
