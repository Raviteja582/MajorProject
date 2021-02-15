import * as ActionType from "./ActionTypes";
import localStorage from "local-storage";
import { baseUrl } from "../url";

export const login_failure = (payload) => ({
    type: ActionType.LOGIN_FAILURE,
    message: payload,
});

export const login_unsuccessfull = (payload) => ({
    type: ActionType.LOGIN_UNSUCCESSFUL,
    message: payload,
});

export const login_verify = (payload) => ({
    type: ActionType.LOGIN_VERIFY,
    message: payload,
});

export const login_success = (payload) => ({
    type: ActionType.LOGIN_SUCCESS,
    message: payload,
});

export const postLogin = (details) => (dispatch) => {
    return fetch(baseUrl + "/teacher/login", {
        method: "POST",
        body: JSON.stringify(details),
        headers: {
            "Content-Type": "application/json",
        },
        credential: "same-origin",
    })
        .then((response) => response.json())
        .then((response) => {
            console.log(response);
            if (response.status === "SUCCESS") {
                localStorage.set("token", response.token);
                dispatch(login_success(response));
            } else if (response.status === "VERIFY")
                dispatch(login_verify(response.err));
            else if (response.status === "LOGIN_UNSUCCESSFUL")
                dispatch(login_unsuccessfull(response.err));
            else dispatch(login_failure(response.err));
        });
};
