import axios, { AxiosResponse, AxiosStatic, AxiosError } from "axios";
import * as FormData from "form-data";
import {Config} from "./config";
var data=new FormData();
data.append("email",Config.name);
data.append("password",Config.password);
data.append("returnUrl","/");
axios.post("https://flow.polar.com/login",data,{
    headers: { 'Content-Type': 'multipart/form-data',
        'origin'    : 'https://flow.polar.com',
    'referer': 'https://flow.polar.com/login',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36' }
}).then((body)=> {
    console.log(body.status,body.headers);
}).catch((err:AxiosError)=> {
    if(err.response) {
        console.error(err.response.status,err.response.headers);
    }else{
        console.error("Other error");
    }
})

