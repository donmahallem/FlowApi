import * as flowApiClient from './flow-api-client';
import { expect } from 'chai';
// if you used the '@types/mocha' method to install mocha type definitions, uncomment the following line
import 'mocha';
import * as request from 'request';
import * as sinon from 'sinon';
import { URL } from "url";
import { beforeEach } from 'mocha';

describe('flow-api-client', () => {
    describe('FlowApiClient', () => {
        describe('constructor()', () => {
            it('should construct', () => {
                expect(new flowApiClient.FlowApiClient()).to.instanceOf(flowApiClient.FlowApiClient);
            });
        });
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
            const testUrls: string[] = [
                'https://google.com/',
                'https://google.de/search',
                'https://google.de/search?q=dafj'
            ]
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
    });
});