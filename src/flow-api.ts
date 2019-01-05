
import { Config } from "./config";
import * as cookieParser from "set-cookie-parser";
import * as FormData from "form-data";
import * as querystring from "querystring";
import * as request from "request";
import * as requestDebug from "request-debug";
import { Agent } from "https";


export class FlowApi {
    private cookieJar2: request.CookieJar = request.jar();
    private readonly baseUrl: string = "https://flow.polar.com";


    public getJar2(): request.CookieJar {
        return this.cookieJar2;
    }
    public signin3(): Promise<request.Response> {
        return new Promise((resolve, reject) => {
            request.get("https://flow.polar.com/login", {
                jar: this.cookieJar2,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36'
                }
            }, function (err, httpResponse, body) {
                console.log("JJJJ");
                if (err) {
                    reject(err);
                } else {
                    resolve(httpResponse);
                }
            })
        });
    }
    public signin2(): Promise<request.Response> {

        const data: any = {
            email: Config.email,
            password: Config.password,
            returnUrl: "/"
        };/*
        console.log("Request data", querystring.stringify(data));
        return Axios.post("https://flow.polar.com/login", querystring.stringify(data), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Origin': 'https://flow.polar.com',
                'Referer': 'https://flow.polar.com/login',
                'Content-Length': querystring.stringify(data).length,
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36'
            },
            maxRedirects: 1,
            transformRequest: this.createCookieInserter(this.cookieJar),
            transformResponse: this.createCookieCatcher(this.cookieJar)
        });*/
        return new Promise((resolve, reject) => {
            console.log("JJJJ");
            requestDebug(request, function (type, data, r) {
                // put your request or response handling logic here
                if (type === "response") {
                    console.log("response", data.headers);
                } else if (type === "request") {
                    console.log("request", data);
                } else if (type === "redirect") {
                    console.log("redirect");
                } else if (type === "auth") {
                    console.log("auth");
                } else {
                    console.log("other");
                }
            });
            request.post({
                url: 'https://flow.polar.com/login',
                form: data,
                method: "post",
                strictSSL: true,
                host: "flow.polar.com",
                jar: this.cookieJar2,
                gzip: false,
                headers: {
                    'Origin': 'https://flow.polar.com',
                    'Referer': 'https://flow.polar.com/',
                    'Content-Length': querystring.stringify(data).length,
                    'x-requested-with': 'XMLHttpRequest',
                    'accept': 'application/json',
                    'accept-language': 'en-US,en;q=0.9',
                    'cookie': 'NSC_ued1-qspe-gmpx-mc=ffffffffc3a0987945525d5f4f58455e445a4a4229a1',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36'
                }
            }, function (err, httpResponse, body) {
                console.log("JJJJ");
                if (err) {
                    reject(err);
                } else {
                    resolve(httpResponse);
                }
            })
        });

    }


}