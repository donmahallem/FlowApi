import * as merger from "./summary-merger";
import { expect } from "chai";
import * as sinon from "sinon";
import "mocha";

describe("SummaryMerger", () => {
    describe("add", () => {
        let mergerInstance: merger.SummaryMerger;
        const testData: any = {
            test: "data",
            testNum: 2
        };
        beforeEach(() => {
            mergerInstance = new merger.SummaryMerger();
        });
        describe("(*)", () => {
            let generateKeyStub: sinon.SinonStub;
            beforeEach(() => {
                generateKeyStub = sinon.stub(mergerInstance, "generateKey");
                generateKeyStub.returns("asdf");
            });

            afterEach(() => {
                expect(generateKeyStub.alwaysCalledWithExactly(testData)).to.be.true;
                expect(generateKeyStub.callCount).to.equal(2);
                generateKeyStub.restore();
            });

            it("should throw error for duplicate", () => {
                generateKeyStub.onCall(1).returns("asdf");
                mergerInstance.add(testData);
                expect(mergerInstance.add.bind(mergerInstance, testData, false)).to.throw();
            });
            it("should not throw error", () => {
                generateKeyStub.onCall(1).returns("asdf2");
                mergerInstance.add(testData);
                expect(mergerInstance.add.bind(mergerInstance, testData)).to.not.throw();
            });
        });
        describe("(*,true|false)", () => {

            let generateKeyStub: sinon.SinonStub;
            beforeEach(() => {
                generateKeyStub = sinon.stub(mergerInstance, "generateKey");
                generateKeyStub.returns("asdf");
            })

            afterEach(() => {
                expect(generateKeyStub.callCount).to.equal(2);
                generateKeyStub.restore();
            });

            describe("(*,false)", () => {
                it("should throw error for duplicate", () => {
                    generateKeyStub.onCall(1).returns("asdf");
                    mergerInstance.add(testData, false);
                    expect(mergerInstance.add.bind(mergerInstance, testData, false)).to.throw();
                });
                it("should not throw error", () => {
                    generateKeyStub.onCall(1).returns("asdf2");
                    mergerInstance.add(testData, false);
                    expect(mergerInstance.add.bind(mergerInstance, testData, false)).to.not.throw();
                });
            });
            describe("(*,true)", () => {
                it("should throw error for duplicate", () => {
                    generateKeyStub.onCall(1).returns("asdf");
                    mergerInstance.add(testData, true);
                    expect(mergerInstance.add.bind(mergerInstance, testData, true)).to.not.throw();
                });
                it("should not throw error", () => {
                    generateKeyStub.onCall(1).returns("asdf2");
                    mergerInstance.add(testData, true);
                    expect(mergerInstance.add.bind(mergerInstance, testData, true)).to.not.throw();
                });
            });
        });
    });
});