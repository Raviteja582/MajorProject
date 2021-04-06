import localStorage from "local-storage";
import { baseUrl } from "../url";
import axios from 'axios';
import { saveAs } from 'file-saver';


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