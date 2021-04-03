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

export const subject_loading = () => ({
    type: ActionType.FETCH_SUBJECTS_LOADING,
});

export const subject_sucess = (payload) => ({
    type: ActionType.FETCH_SUBJECTS_SUCCESS,
    payload: payload,
});

export const subject_failure = (payload) => ({
    type: ActionType.FETCH_SUBJECTS_FAILURE,
    payload: payload,
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

export const fetchSubjects = () => async(dispatch) => {
    dispatch(subject_loading());
    const bearer = 'Bearer ' + localStorage.get('token');
    return fetch(baseUrl + '/teacher/subject/', {
        headers: {
            'Authorization': bearer
        },
    })
    .then( response => {
        if(response.ok){
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': '+ response.statusText);
            error.response=response;
            throw error;
        }
    },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(subjects => {
            var xs = [];
            for (var i = 0; i < subjects.length; i++){
                xs.push({ id: subjects[i]._id, label: subjects[i].name, value: subjects[i].code, depId: subjects[i].department._id, depName: subjects[i].department.name, year: subjects[i].department.year, semester: subjects[i].department.semester });
            }
        //     subjects.map((sub) => {
        //         xs.push({ label: sub.name, value: sub._id, depId: sub.department._id, depName: sub.department.name, year: sub.department.year, semester: sub.department.semester });
        // })
            return xs;
        })
        .then(subjects => dispatch(subject_sucess(subjects)))
        .catch( error => dispatch(subject_failure(error.message)));
};


export const postQuestion = (question) => {
    const bearer = 'Bearer '+ localStorage.get('token');
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
            var str =details.value+"_"+ date_ob.getHours() + "_" + date_ob.getMinutes();
            saveAs(pdfBlob, str+'.pdf');
            window.location.reload();
        })
        .catch((err) => console.log(err));
    // return fetch(baseUrl + '/teacher/semPaper', {
    //     method: 'POST',
    //     body: JSON.stringify(details),
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': bearer
    //     },
    // })
}