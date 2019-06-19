
import {
    FlowDate,
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

    public get jar(): request.CookieJar {
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
        return this.toPromise(request.post("https://flow.polar.com/login", {
            form: data,
        }));
    }

    public getSleep(id: number | string): Promise<ISleepInterval[]> {
        const getSleepUrl: URL = this.createBaseUrl();
        getSleepUrl.pathname = "/api/sleep/" + id;
        return this.get(getSleepUrl);
    }

    public getSleepNearby(date: FlowDate): Promise<ISleepNearby> {
        const url: URL = this.createBaseUrl();
        url.pathname = "/api/sleep/nights/nearby";
        url.searchParams.set("date", date.toString());
        return this.get(url);
    }
    public getHistory(from: FlowDate, to: FlowDate, userId, types?: number[]): Promise<ISleepNearby> {
        const url: URL = this.createBaseUrl();
        url.pathname = "/api/training/history";
        const reqBody: any = {
            fromDate: from.toString(),
            sportIds: types,
            toDate: to.toString(),
            userId,
        };
        return this.post(url, reqBody);
    }

    public createBaseUrl(): URL {
        return new URL("https://flow.polar.com/");
    }

    public getActivityTimelineForDay(date: FlowDate,
                                     sampleCount: number = 50000): Promise<IDaySummary> {
        const url: URL = this.createBaseUrl();
        url.pathname = "/api/activity-timeline/load";
        url.searchParams.set("day", date.toString());
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
