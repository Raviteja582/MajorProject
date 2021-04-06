import * as ActionType from "./ActionTypes";
import localStorage from "local-storage";
import { baseUrl } from "../url";
import axios from 'axios';
import { saveAs } from 'file-saver';


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

export const logout_success = () => ({
    type: ActionType.LOGOUT_SUCCESS,
});


export const postLogin = (details) => async (dispatch) => {
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
                localStorage.set("user", response.user);
                dispatch(login_success(response));
            } else if (response.status === "VERIFY")
                dispatch(login_verify(response.err));
            else if (response.status === "LOGIN_UNSUCCESSFUL")
                dispatch(login_unsuccessfull(response.err));
            else dispatch(login_failure(response.err));
        });
};

export const postLogout = () => (dispatch) => {
    localStorage.clear();
    dispatch(logout_success());
    window.location.reload();
};

export const fetchSubjects = async () => {
    const bearer = 'Bearer ' + localStorage.get('token');
    return fetch(baseUrl + '/teacher/subject/', {
        headers: {
            'Authorization': bearer
        },
    })
};


export const postQuestion = (question) => {
    const bearer = 'Bearer ' + localStorage.get('token');
    return fetch(baseUrl + '/teacher/question/post', {
        method: 'PUT',
        body: JSON.stringify(question),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        }
    })
}
export const getSubjectDetails = async () => {
    const bearer = 'Bearer ' + localStorage.get('token');
    return fetch(baseUrl + '/teacher/question/get', {
        headers: {
            'Authorization': bearer
        },
    })
}

export const getMid1 = async (details) => {
    const bearer = 'Bearer ' + localStorage.get('token');
    const instance = axios.create({
        baseURL: baseUrl,
        timeout: 5000,
        headers: { 'Authorization': bearer },
        responseType: 'blob'
    });
    instance.post('/teacher/mid1', details)
        .then(response => {
            const pdfBlob = new Blob([response.data], { type: 'application/pdf' })
            let date_ob = new Date();
            var str = details.value + "_" + date_ob.getHours() + "_" + date_ob.getMinutes();
            saveAs(pdfBlob, str + '.pdf');
        })
        .catch((err) => alert('Cannot Generate, not enough Questions'));
}

export const getMid2 = async (details) => {
    const bearer = 'Bearer ' + localStorage.get('token');
    const instance = axios.create({
        baseURL: baseUrl,
        timeout: 5000,
        headers: { 'Authorization': bearer },
        responseType: 'blob'
    });
    instance.post('/teacher/mid2', details)
        .then(response => {
            const pdfBlob = new Blob([response.data], { type: 'application/pdf' })
            let date_ob = new Date();
            var str = details.value + "_" + date_ob.getHours() + "_" + date_ob.getMinutes();
            saveAs(pdfBlob, str + '.pdf');
        })
        .catch((err) => {
            alert('Cannot Generate, not enough Questions')
        });
}

export const getPdf = async (details) => {
    const bearer = 'Bearer ' + localStorage.get('token');
    const instance = axios.create({
        baseURL: baseUrl,
        timeout: 5000,
        headers: { 'Authorization': bearer },
        responseType: 'blob'
    });
    instance.post('/teacher/semPaper', details)
        .then(response => {
            const pdfBlob = new Blob([response.data], { type: 'application/pdf' })
            let date_ob = new Date();
            var str = details.value + "_" + date_ob.getHours() + "_" + date_ob.getMinutes();
            saveAs(pdfBlob, str + '.pdf');
        })
        .catch((err) => alert('Cannot Generate, not enough Questions'));
}

export const getQuestions = (details, diffcult) => {
    const bearer = 'Bearer ' + localStorage.get('token');
    return fetch(baseUrl + '/teacher/' + diffcult + '/get', {
        method: 'POST',
        body: JSON.stringify(details),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        }
    })
}

export const editQuestions = (details, id, diffcult, unit) => {
    var xs = {}
    xs["id"] = id
    xs["unit"] = unit
    xs[diffcult] = details;
    console.log(xs);
    const bearer = 'Bearer ' + localStorage.get('token');
    return fetch(baseUrl + '/teacher/' + diffcult + '/put', {
        method: 'PUT',
        body: JSON.stringify(xs),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        }
    })
}