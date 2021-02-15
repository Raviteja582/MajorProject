import { createStore, combineReducers, applyMiddleware } from "redux";
import { User } from "./user";
import thunk from "redux-thunk";
import logger from "redux-logger";

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            user: User,
        }),
        applyMiddleware(thunk, logger)
    );
    return store;
};
