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
                dispatch(login_success(response));
            } else if (response.status === "VERIFY")
                dispatch(login_verify(response.err));
            else if (response.status === "LOGIN_UNSUCCESSFUL")
                dispatch(login_unsuccessfull(response.err));
            else dispatch(login_failure(response.err));
        });
};

export const postLogout = () => (dispatch) => {
    localStorage.remove("token");
    dispatch(logout_success());
    window.location.reload();
};

export const fetchSubjects = () => async(dispatch) => {
    dispatch(subject_loading());
    const bearer = 'Bearer ' + localStorage.get('token');
    console.log(bearer);
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

export const AllFuntions = (xs) => {
    var x1 = postEasy(xs.easy)
    if (x1) {
        var x2 =  postMedium(xs.medium)
        if (x2) {
            var x3 =  postHard(xs.hard)
            if (x3)
                return true
        }
        return false
    }
    return false
}

const postEasy = (easy,arr) => {
    const bearer = 'Bearer '+ localStorage.get('token');
    return fetch(baseUrl + '/teacher/easy/post', {
        method: 'PUT',
        body: JSON.stringify(easy),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        }
    })
        .then((res) => res.json())
        .then((res) => {
            return true
        }).catch( error => console.log(error));
}

const postMedium = (medium,arr) => {
    const bearer = 'Bearer '+ localStorage.get('token');
    return fetch(baseUrl + '/teacher/medium/post', {
        method: 'PUT',
        body: JSON.stringify(medium),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        }
    })
        .then((res) => res.json())
        .then((res) => {
            return true
        }).catch( error => console.log(error));
}

const postHard = (hard,arr) => {
    const bearer = 'Bearer '+ localStorage.get('token');
    return fetch(baseUrl + '/teacher/hard/post', {
        method: 'PUT',
        body: JSON.stringify(hard),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        }
    })
        .then((res) => res.json())
        .then((res) => {
            return true
        }).catch( error => console.log(error));
}