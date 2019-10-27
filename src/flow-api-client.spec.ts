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
    });
});