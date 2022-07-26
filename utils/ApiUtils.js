import {ACCESS_TOKEN, API_BASE_URL} from "../constants";
import {api} from "../constants/api";


const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })

    if (localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
        .then(response =>
            response.json().then(json => {
                if (!response.ok) {
                    return Promise.reject(json);
                }
                return json.data;
            })
        );
};

const getUrl = (urlSuffix) => {
    return API_BASE_URL + urlSuffix;
}

export function getCurrentUser() {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: getUrl(api.userMe),
        method: 'GET'
    });
}

export function signUp(registerRequest) {
    return request({
        url: getUrl(api.register),
        method: 'POST',
        body: JSON.stringify(registerRequest)
    });
}
export function getFoods() {
    return request({
        url: getUrl(api.getFoods),
        method: 'GET'
    });
}
