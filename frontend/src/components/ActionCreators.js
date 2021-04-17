import localStorage from "local-storage";
import { baseUrl } from "../url";

export const postLogout = () => {
    localStorage.clear();
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

export const postQuestion = async (question) => {
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

export const getQuestions = async (details, diffcult) => {
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

export const editQuestions = async(details, id, diffcult, unit) => {
    var xs = {}
    xs["id"] = id
    xs["unit"] = unit
    xs[diffcult] = details;
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

export const addDepartment = async (details) => {
    const bearer = 'Bearer ' + localStorage.get('token');
    return fetch(baseUrl + '/admin/department/GetandAddandRemove', {
        method: 'POST',
        body: JSON.stringify(details),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        }
    })
}

export const removeDepartment = async (details) => {
    const bearer = 'Bearer ' + localStorage.get('token');
    return fetch(baseUrl + '/admin/department/GetandAddandRemove', {
        method: 'DELETE',
        body: JSON.stringify(details),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        }
    })
}

export const getDepartment = async () => {
    const bearer = 'Bearer ' + localStorage.get('token');
    return fetch(baseUrl + '/admin/department/GetandAddandRemove', {
        headers: {
            'Authorization': bearer
        }
    })
}

export const addSubject = async (details) => {
    const bearer = 'Bearer ' + localStorage.get('token');
    return fetch(baseUrl + '/admin/subject/GetandAddandRemove', {
        method: 'POST',
        body: JSON.stringify(details),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        }
    })
}

export const removeSubject = async (code) => {
    const bearer = 'Bearer ' + localStorage.get('token');
    return fetch(baseUrl + '/admin/subject/GetandAddandRemove', {
        method: 'DELETE',
        body: JSON.stringify(code),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        }
    })
}

export const getSubjects = async (details) => {
    const bearer = 'Bearer ' + localStorage.get('token');
    return fetch(baseUrl + '/admin/subject/get', {
        method: 'POST',
        body: JSON.stringify(details),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        }
    })
}

export const getProfile = async () => {
    const bearer = 'Bearer ' + localStorage.get('token');
    return fetch(baseUrl + '/teacher/update', {
        headers: {
            'Authorization': bearer
        }
    })
}

export const updateProfile = async (details) => {
    const bearer = 'Bearer ' + localStorage.get('token');
    return fetch(baseUrl + '/teacher/update', {
        method: 'PUT',
        body: JSON.stringify(details),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        }
    })
}