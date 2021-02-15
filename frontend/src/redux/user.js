import * as ActionType from "./ActionTypes";
import localStorage from "local-storage";
export const User = (
    state = {
        type: null,
        err: null,
        user: null,
        token: localStorage.get("token") || null,
    },
    action
) => {
    switch (action.type) {
        case ActionType.LOGIN_FAILURE:
            return {
                ...state,
                type: action.type,
                err: action.message,
                user: null,
                token: null,
            };
        case ActionType.LOGIN_UNSUCCESSFUL:
            return {
                ...state,
                type: action.type,
                err: action.message,
                user: null,
                token: null,
            };
        case ActionType.LOGIN_VERIFY:
            return {
                ...state,
                type: action.type,
                err: action.message,
                user: null,
                token: null,
            };
        case ActionType.LOGIN_SUCCESS:
            return {
                ...state,
                type: action.type,
                err: null,
                user: action.message.user,
            };
        default:
            return state;
    }
};
