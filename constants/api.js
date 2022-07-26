import {useState} from "react";

export const api = {
    userMe: '/api/v1/auth/me',
/*    signUp: '/api/auth/v1/auth/sign-up',
    checkPhone: '/api/auth/v1/auth/check-phone',
    checkVerificationCode: '/api/auth/v1/auth/verify',*/
    register:'/api/v1/auth/register',
    verificationSendForRegister:'/api/v1/verification/send/forRegister/',
    getFoods:"/api/v1/food"



}


const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null
export var lan="en";
export function changeLanguage(val){
    lan=val;
}
export const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    'Accept-Language':lan
}