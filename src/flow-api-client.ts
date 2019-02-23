
import * as request from 'request';
import { DaySummary } from '@donmahallem/flow-api-types';
import { SleepNearby, SleepInterval } from '@donmahallem/flow-api-types';


export class FlowApiClient {
    private cookieJar: request.CookieJar = request.jar();
    private mUserAgent: string = 'Mozilla/5.0';

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
            returnUrl: '/',
            email: mail,
            password: password
        };
        return new Promise((resolve, reject) => {
            request.post('https://flow.polar.com/login', {
                form: data,
                jar: this.cookieJar,
                headers: {
                    //'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    //'content-length': querystring.stringify(data).length,
                    'accept': 'application/json',
                    'user-agent': this.userAgent
                }
            }, function (err, httpResponse, body) {
                if (err) {
                    reject(err);
                } else {
                    resolve(httpResponse);
                }
            })
        });
    }

    public getSleep(id: number): Promise<SleepInterval[]> {
        return new Promise((resolve, reject) => {
            request.get('https://flow.polar.com/api/sleep/' + id, {
                jar: this.cookieJar,
                headers: {
                    'user-agent': this.userAgent
                }
            }, function (err, httpResponse, body) {
                if (err) {
                    reject(err);
                } else {
                    resolve(JSON.parse(body));
                }
            });
        });
    }

    public getSleepNearby(year: number, month: number, day: number): Promise<SleepNearby> {
        if (month < 1 || month > 12) {
            return Promise.reject(new Error('The month must be equal to or between 1 and 12'));
        }
        if (day < 1 || day > 31) {
            return Promise.reject(new Error('The day must be equal to or between 1 and 31'));
        }
        const _year: string = '' + year;
        const _month: string = (month < 10) ? ('0' + month) : ('' + month);
        const _day: string = (day < 10) ? ('0' + day) : ('' + day);
        return new Promise((resolve, reject) => {
            request.get('https://flow.polar.com/api/sleep/nights/nearby?date=' + _year + '-' + _month + '-' + _day, {
                jar: this.cookieJar,
                headers: {
                    'user-agent': this.userAgent
                }
            }, function (err, httpResponse, body) {
                if (err) {
                    reject(err);
                } else {
                    resolve(JSON.parse(body));
                }
            });
        });
    }

    public getActivityTimelineForDay(year: number, month: number, day: number, sampleCount: number = 50000): Promise<DaySummary> {
        if (month < 1 || month > 12) {
            return Promise.reject(new Error('The month must be equal to or between 1 and 12'));
        }
        if (day < 1 || day > 31) {
            return Promise.reject(new Error('The day must be equal to or between 1 and 31'));
        }
        if (sampleCount < 1) {
            return Promise.reject(new Error('Samplecount must be atleast 1'));
        }
        const _year: string = '' + year;
        const _month: string = (month < 10) ? ('0' + month) : ('' + month);
        const _day: string = (day < 10) ? ('0' + day) : ('' + day);
        return new Promise((resolve, reject) => {
            request.get('https://flow.polar.com/api/activity-timeline/load?day=' + _year + '-' + _month + '-' + _day + '&maxSampleCount=' + sampleCount, {
                jar: this.cookieJar,
                headers: {
                    'accept': 'application/json',
                    'user-agent': this.userAgent
                }
            }, this.createResponseHandler(resolve, reject));
        });
    }

    public createResponseHandler(resolve, reject): request.RequestCallback {
        return (err: any, httpResponse: request.Response, body: any) => {
            if (err) {
                reject(err);
                return;
            }
            if (httpResponse.statusCode == 200) {
                const contentType: string = httpResponse.headers['content-type'];
                if (contentType && contentType.startsWith('application/json')) {
                    resolve(JSON.parse(body));
                }
                resolve(body);
            } else {
                reject(new Error('Code ' + httpResponse.statusCode));
            }
        }
    }
}