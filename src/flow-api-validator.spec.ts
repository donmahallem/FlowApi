import * as flowApiValidator from "./flow-api-validator";
import { expect } from "chai";
import * as sinon from "sinon";
import * as jsonschema from "jsonschema";
import { addressSchema } from "./schemas/day-summary";
// if you used the "@types/mocha" method to install mocha type definitions, uncomment the following line
import "mocha";

describe("FlowApiValidator", () => {
    describe("validateTimelineSummaryPromise()", () => {
        let stub1: sinon.SinonStub;
        const testObj: any = {
            test: 1,
            test2: "asdf"
        };
        const testData: any = {
            test: "2135135",
            test2: "asdf"
        };
        before(() => {
            stub1 = sinon.stub(flowApiValidator.FlowApiValidator, "validateTimelineSummary").returns(testObj);
        });
        after(() => {
            stub1.restore();
        });
        it("should returnvalidateTimelineSummary hello world", () => {
            return flowApiValidator.FlowApiValidator.validateTimelineSummaryPromise(testData)
                .then((data) => {
                    expect(testObj).to.deep.equal(data);
                    expect(stub1.callCount).to.equal(1);
                    expect(stub1.getCall(0).args).to.deep.equal([testData]);
                });
        });
    });
    describe("validateTimelineSummary()", () => {
        let stub1: sinon.SinonStub;
        let stubInstance: sinon.SinonStubbedInstance<jsonschema.Validator>;
        const testObj: any = {
            test: 1,
            test2: "asdf"
        };
        before(() => {
            stubInstance = sinon.createStubInstance(jsonschema.Validator);
            stubInstance.validate.returns(<any>false);
            stub1 = sinon.stub(jsonschema, "Validator").returns(stubInstance);
        });
        after(() => {
            stub1.restore();
        });
        it("should returnvalidateTimelineSummary hello world", () => {
            expect(flowApiValidator.FlowApiValidator.validateTimelineSummary(testObj)).to.equal(false, "Must return false");
            expect(stub1.callCount).to.equal(1);
            expect(stubInstance.addSchema.callCount).to.equal(1);
            expect(stubInstance.addSchema.getCall(0).args.length).to.equal(1);
            expect(stubInstance.addSchema.getCall(0).args[0]).to.deep.equal(addressSchema);
            expect(stubInstance.validate.callCount).to.equal(1);
            expect(stubInstance.validate.getCall(0).args).to.deep.equal([testObj, addressSchema]);
        });
    });
});