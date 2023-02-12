import axios from "axios";

const sendRequest = {
    post: (url, data, headers) => handleRequest(url, data, "POST", headers),
    get: (url, data) => handleRequest(url, data, "GET")
};

export default sendRequest;

function handleRequest(url, data, method, headers = {}) {
 
    return new Promise((resolve, reject) => {
        request.request({
            method,
            url,
            data,
        })
            .then(res => {
                resolve(res?.data);
            })
            .catch(err => reject(err));
    });
}


const request = axios.create({
    baseURL: process.env.REACT_APP_CUSTOM_BASE_URL,
    withCredentials: false,
});





request.interceptors.response.use(async function (config) {
    return config;
}, async function (error) {
    if (error && error.response && error.response.status === 401) {
        window.handleLogout();
    } else {
        return Promise.reject(error);
    }
});
