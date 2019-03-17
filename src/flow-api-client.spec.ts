import * as flowApiClient from './flow-api-client';
import { expect } from 'chai';
// if you used the '@types/mocha' method to install mocha type definitions, uncomment the following line
import 'mocha';
import * as request from 'request';
import * as sinon from 'sinon';
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
                (<any>instance).requestInstance = {
                    get: getStub
                };
                toPromiseStub = sandbox.stub(instance, 'toPromise');
                toPromiseStub.returns(Promise.resolve(true));
                getStub.returns(132599135);
                console.log(instance.toPromise('test'), instance.get(new URL("http://test.de")));
            });
            beforeEach('before each', () => {
                console.log('each', instance.get(new URL("http://test.de")));
            });
            afterEach('reset stubs', () => {
                sandbox.reset();
            })
            after('restore all', () => {
                sandbox.restore();
            })
            it('should stub', () => {
                console.log(instance.get(new URL("http://test.de")));
                return instance.get(new URL('https://google.com'))
                    .then((value) => {
                        expect(value).to.equal(159);
                    });
            });
        });
    });
});