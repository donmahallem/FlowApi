
import {
    IDaySummary,
    ISleepInterval,
    ISleepNearby,
} from "@donmahallem/flow-api-types";
import * as request from "request";
import { URL } from "url";

export class FlowApiClient {
    private cookieJar: request.CookieJar = request.jar();
    private mUserAgent: string = "Mozilla/5.0";
    private requestClient: request.RequestAPI<request.Request, request.Options, request.RequiredUriUrl>;
    constructor() {
        this.requestClient = request.defaults({
            headers: {
                "accept": "application/json",
                "user-agent": this.userAgent,
            },
            jar: this.cookieJar,
        });
    }

    public getJar(): request.CookieJar {
        return this.cookieJar;
    }

    public get userAgent(): string {
        return this.mUserAgent;
    }

    public set userAgent(useragent: string) {
        this.mUserAgent = useragent;
    }

    /**
     *
     * @param mail The mail used to login to flow.polar.com
     * @param password the password used to login to flow.polar.com
     */
    public signin(mail: string, password: string): Promise<request.Response> {
        const data: any = {
            email: mail,
            password,
            returnUrl: "/",
        };
        return new Promise((resolve, reject) => {
            request.post("https://flow.polar.com/login", {
                form: data,
                headers: {
                    // 'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    // 'content-length': querystring.stringify(data).length,
                    "accept": "application/json",
                    "user-agent": this.userAgent,
                },
                jar: this.cookieJar,
            }, (err, httpResponse, body) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(httpResponse);
                }
            });
        });
    }

    public getSleep(id: number): Promise<ISleepInterval[]> {
        return new Promise((resolve, reject) => {
            request.get("https://flow.polar.com/api/sleep/" + id, {
                headers: {
                    "user-agent": this.userAgent,
                },
                jar: this.cookieJar,
            }, (err, httpResponse, body) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(JSON.parse(body));
                }
            });
        });
    }

    public getSleepNearby(year: number, month: number, day: number): Promise<ISleepNearby> {
        if (month < 1 || month > 12) {
            return Promise.reject(new Error("The month must be equal to or between 1 and 12"));
        }
        if (day < 1 || day > 31) {
            return Promise.reject(new Error("The day must be equal to or between 1 and 31"));
        }
        const convYear: string = "" + year;
        const convMonth: string = (month < 10) ? ("0" + month) : ("" + month);
        const convDay: string = (day < 10) ? ("0" + day) : ("" + day);
        return new Promise((resolve, reject) => {
            request.get("https://flow.polar.com/api/sleep/nights/nearby?date=" + convYear
                + "-" + convMonth + "-" + convDay, {
                    headers: {
                        "user-agent": this.userAgent,
                    },
                    jar: this.cookieJar,
                }, (err, httpResponse, body) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(JSON.parse(body));
                    }
                });
        });
    }

    public createBaseUrl(): URL {
        return new URL("https://flow.polar.com/");
    }

    public getActivityTimelineForDay(year: number,
                                     month: number,
                                     day: number,
                                     sampleCount: number = 50000): Promise<IDaySummary> {
        if (month < 1 || month > 12) {
            return Promise.reject(new Error("The month must be equal to or between 1 and 12"));
        }
        if (day < 1 || day > 31) {
            return Promise.reject(new Error("The day must be equal to or between 1 and 31"));
        }
        if (sampleCount < 1) {
            return Promise.reject(new Error("Samplecount must be atleast 1"));
        }
        const convYear: string = "" + year;
        const convMonth: string = (month < 10) ? ("0" + month) : ("" + month);
        const convDay: string = (day < 10) ? ("0" + day) : ("" + day);
        const url: URL = this.createBaseUrl();
        url.pathname = "/api/activity-timeline/load";
        url.searchParams.set("day", "" + convYear + "-" + convMonth + "-" + convDay);
        url.searchParams.set("maxSampleCount", sampleCount.toString(10));
        return this.get(url);
    }

    public toPromise<T>(req: request.Request): Promise<T> {
        return new Promise((resolve, reject) => {
            req.callback = this.createResponseHandler(resolve, reject);
        });
    }
    /**
     * Executes a get request
     * @param url url to query
     */
    public get<T>(queryUrl: URL): Promise<T> {
        return this.toPromise(this.requestClient.get(queryUrl.toString()));
    }
    /**
     * Executes a post request
     * @param url url to request
     * @param body body to send
     */
    public post<T, B>(queryUrl: URL, body: B): Promise<T> {
        return this.toPromise(this.requestClient.post(queryUrl.toString(), {
            body,
        }));
    }

    public createResponseHandler(resolve: (value: any) => void, reject: (err?: any) => void): request.RequestCallback {
        return (err: any, httpResponse: request.Response, body: any) => {
            if (err) {
                reject(err);
                return;
            }
            if (httpResponse.statusCode === 200) {
                const contentType: string = httpResponse.headers["content-type"];
                if (contentType && contentType.startsWith("application/json")) {
                    resolve(JSON.parse(body));
                }
                resolve(body);
            } else {
                reject(new Error("Code " + httpResponse.statusCode));
            }
        };
    }
}
