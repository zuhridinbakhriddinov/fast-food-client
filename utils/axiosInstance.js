/*
import axios from "axios";
import jwt_decode from "jwt-decode";
import dayjs from 'dayjs'

const baseURL = 'http://localhost:8081'


let accessToken = localStorage.getItem('accessToken') ? JSON.parse(localStorage.getItem('accessToken')) : null
let refreshToken = localStorage.getItem('refreshToken') ? JSON.parse(localStorage.getItem('refreshToken')) : null

const axiosInstance = axios.create({
    baseURL,
    headers:{Authorization: `Bearer ${accessToken}`}
});

axiosInstance.interceptors.request.use(async req => {
    if(!accessToken){
        accessToken = localStorage.getItem('accessToken') ? JSON.parse(localStorage.getItem('accessToken')) : null
        req.headers.Authorization = `Bearer ${accessToken}`
    }

    const user = jwt_decode(accessToken)
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

    if(!isExpired) return req

    const response = await axios.post(`${baseURL}/api/token/refresh/`, {
        refresh: refreshToken
    });

    localStorage.setItem('authTokens', JSON.stringify(response.data))
    req.headers.Authorization = `Bearer ${response.data.access}`
    return req
})


export default axiosInstance;*/
