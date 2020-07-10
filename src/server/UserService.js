/*
    last update:2020.7.9
    for user operation : login ,register,like...
 */

import {postRequest} from "../scripts/ajax";

export const login=(data,callback)=>{
    var url="localhost:8080/login";
    console.log("login");
    postRequest(url,data,callback);
    console.log("login complete!")
}

export const register=(data,callback)=>{
    var url="localhost:8080/register";
    console.log("register");
    postRequest(url,data,callback);
    console.log("register complete!")
}