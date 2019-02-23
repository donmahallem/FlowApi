import * as flowApiClient from './flow-api-client';
import { expect } from 'chai';
// if you used the '@types/mocha' method to install mocha type definitions, uncomment the following line
import 'mocha';

describe('FlowApiClient', () => {
    describe('constructor()', () => {
        it('should construct', () => {
            expect(new flowApiClient.FlowApiClient()).to.instanceOf(flowApiClient.FlowApiClient);
        });
    });
});