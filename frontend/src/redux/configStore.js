import { createStore, combineReducers, applyMiddleware } from "redux";
import { User } from "./user";
import { Subject } from "./subjects";
import thunk from "redux-thunk";
import logger from "redux-logger";

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            user: User,
            subjects: Subject,
        }),
        applyMiddleware(thunk, logger)
    );
    return store;
};
