import * as flowApiClient from './flow-api-client';
import { expect } from 'chai';
// if you used the '@types/mocha' method to install mocha type definitions, uncomment the following line
import 'mocha';
import * as request from 'request';
import * as sinon from 'sinon';
import { URL } from "url";
import { beforeEach } from 'mocha';
import { FlowDate } from '@donmahallem/flow-api-types';

describe('flow-api-client', () => {
    describe('FlowApiClient', () => {
        describe('constructor()', () => {
            it('should construct', () => {
                expect(new flowApiClient.FlowApiClient()).to.instanceOf(flowApiClient.FlowApiClient);
            });
        });
        const testUrls: string[] = [
            'https://google.com/',
            'https://google.de/search',
            'https://google.de/search?q=dafj'
        ];
        describe('get<T>(url: URL)', () => {
            let getStub: sinon.SinonStub;
            let toPromiseStub: sinon.SinonStub;
            let instance: flowApiClient.FlowApiClient;
            let sandbox: sinon.SinonSandbox;
            before('init classes', () => {
                sandbox = sinon.createSandbox();
                getStub = sandbox.stub();
                instance = new flowApiClient.FlowApiClient();
                (<any>instance).requestClient = {
                    get: getStub
                };
                toPromiseStub = sandbox.stub(instance, 'toPromise');
                toPromiseStub.returns(Promise.resolve(true));
            });
            afterEach('reset stubs', () => {
                sandbox.resetHistory();
            });
            after('restore all', () => {
                sandbox.restore();
            });
            testUrls.forEach((testUrl: string) => {
                it('should work with "' + testUrl + '"', () => {
                    getStub.returns(testUrl);
                    return instance.get(new URL(testUrl))
                        .then((value) => {
                            expect(value).to.equal(true, 'be true');
                            expect(getStub.callCount).to.equal(1);
                            expect(getStub.getCall(0).args).to.deep.equal([testUrl]);
                            expect(toPromiseStub.callCount).to.equal(1);
                            expect(toPromiseStub.getCall(0).args).to.deep.equal([testUrl]);
                        });
                });
            });
        });
        describe('post<T,B>(url: URL,body:B)', () => {
            let postStub: sinon.SinonStub;
            let toPromiseStub: sinon.SinonStub;
            let instance: flowApiClient.FlowApiClient;
            let sandbox: sinon.SinonSandbox;
            before('init classes', () => {
                sandbox = sinon.createSandbox();
                postStub = sandbox.stub();
                instance = new flowApiClient.FlowApiClient();
                (<any>instance).requestClient = {
                    post: postStub
                };
                toPromiseStub = sandbox.stub(instance, 'toPromise');
                toPromiseStub.returns(Promise.resolve(true));
            });
            afterEach('reset stubs', () => {
                sandbox.resetHistory();
            });
            after('restore all', () => {
                sandbox.restore();
            });
            const testBody: any = {
                test: 1,
                tset: 2
            };
            testUrls.forEach((testUrl: string) => {
                it('should work with "' + testUrl + '"', () => {
                    postStub.returns(testUrl);
                    return instance.post(new URL(testUrl), testBody)
                        .then((value) => {
                            expect(value).to.equal(true, 'be true');
                            expect(postStub.callCount).to.equal(1);
                            expect(postStub.getCall(0).args).to.deep.equal([testUrl, {
                                body: testBody
                            }]);
                            expect(toPromiseStub.callCount).to.equal(1);
                            expect(toPromiseStub.getCall(0).args).to.deep.equal([testUrl]);
                        });
                });
            });
        });
        describe('toPromise<T>(req: request.Request)', () => {
            let createRespHandlerStub: sinon.SinonStub;
            let sandbox: sinon.SinonSandbox;
            let instance: flowApiClient.FlowApiClient;
            interface TestRequest {
                callback?: (a?, b?, c?) => void;
            }
            before('init classes', () => {
                sandbox = sinon.createSandbox();
                instance = new flowApiClient.FlowApiClient();
                createRespHandlerStub = sandbox.stub(instance, 'createResponseHandler');
                createRespHandlerStub.callsFake((a, b) => {
                    return (c, d, e) => {
                        if (c) {
                            setTimeout(a.bind(a, c));
                        } else {
                            setTimeout(b.bind(a, d));
                        }
                    }
                });
            });
            let testRequest: TestRequest;
            let prom: Promise<any>;
            beforeEach('create test items', () => {
                testRequest = {};
                prom = instance.toPromise(testRequest);
            })
            afterEach('reset stubs', () => {
                sandbox.resetHistory();
            });
            after('restore all', () => {
                sandbox.restore();
            });
            ['value1', 'value2'].forEach((testValue) => {
                it('should finish successfully with "' + testValue + '"', () => {
                    testRequest.callback(testValue)
                    return prom.then((res) => {
                        expect(res).to.equal(testValue);
                        expect(testRequest.callback).to.not.be.undefined;
                    });
                });
                it('should fail with "' + testValue + '"', () => {
                    testRequest.callback(undefined, testValue)
                    return prom.then((res) => {
                        throw new Error('should not be called');
                    }, (err) => {
                        expect(err).to.equal(testValue);
                        expect(testRequest.callback).to.not.be.undefined;
                    });
                });
            });
        });
        describe('getActivityTimelineForDay(date: FlowDate, sampleCount: number)', () => {
            let createBaseUrlStub: sinon.SinonStub;
            let getStub: sinon.SinonStub;
            let sandbox: sinon.SinonSandbox;
            let instance: flowApiClient.FlowApiClient;
            const testDomain: string = 'http://test.domain';
            before('init classes', () => {
                sandbox = sinon.createSandbox();
                instance = new flowApiClient.FlowApiClient();
                createBaseUrlStub = sandbox.stub(instance, 'createBaseUrl');
                getStub = sandbox.stub(instance, 'get');
                createBaseUrlStub.returns(new URL(testDomain));
            });
            beforeEach('create test items', () => {
            })
            afterEach('reset stubs', () => {
                sandbox.resetHistory();
            });
            after('restore all', () => {
                sandbox.restore();
            });
            const testDates: FlowDate[] = [
                new FlowDate(1234, 4, 12),
                new FlowDate(2390, 9, 6),
                new FlowDate(2512, 8, 15)
            ]
            describe('with default parameters', () => {
                testDates.forEach((testDate) => {
                    [2, 4, 8, 16].forEach((testSample) => {
                        it('should finish successfully with "' + testDate + '" and "' + testSample + '"', () => {
                            getStub.resolves(testDate);
                            const testUrl: URL = new URL(testDomain);
                            testUrl.pathname = "/api/activity-timeline/load";
                            testUrl.searchParams.set("day", testDate.toString());
                            testUrl.searchParams.set("maxSampleCount", "" + testSample);
                            return instance.getActivityTimelineForDay(testDate, testSample)
                                .then((value) => {
                                    expect(value).to.equal(testDate);
                                    expect(getStub.callCount).to.equal(1);
                                    expect(getStub.getCall(0).args).to.deep.equal([testUrl]);
                                });
                        });
                    });
                });
            });
            describe('without default parameters', () => {
                testDates.forEach((testDate) => {
                    it('should finish successfully with "' + testDate + '"', () => {
                        getStub.resolves(testDate);
                        const testUrl: URL = new URL(testDomain);
                        testUrl.pathname = "/api/activity-timeline/load";
                        testUrl.searchParams.set("day", testDate.toString());
                        testUrl.searchParams.set("maxSampleCount", "50000");
                        return instance.getActivityTimelineForDay(testDate)
                            .then((value) => {
                                expect(value).to.equal(testDate);
                                expect(getStub.callCount).to.equal(1);
                                expect(getStub.getCall(0).args).to.deep.equal([testUrl]);
                            });
                    });
                });
            });
        });
    });
});