import * as merger from "./summary-merger";
import { expect } from "chai";
import * as sinon from "sinon";
import "mocha";

describe("SummaryMerger", () => {
    describe("add", () => {
        describe("-- error on duplicate in constructor", () => {

            let generateKeyStub: sinon.SinonStub;
            let mergerInstance: merger.SummaryMerger;
            beforeEach(() => {
                mergerInstance = new merger.SummaryMerger(true);
                generateKeyStub = sinon.stub(mergerInstance, "generateKey");
            })

            afterEach(() => {
                generateKeyStub.restore();
            });

            it("should throw error for duplicate", () => {
                generateKeyStub.onCall(0).returns("asdf");
                generateKeyStub.onCall(1).returns("asdf");
                mergerInstance.add(<any>{}, false);
                expect(mergerInstance.add.bind(this, <any>{}, false)).to.throw;
            });
            it("should not throw error", () => {
                generateKeyStub.onCall(0).returns("asdf");
                generateKeyStub.onCall(1).returns("asdf");
                mergerInstance.add(<any>{}, true);
                expect(mergerInstance.add.bind(this, <any>{}, true)).to.not.throw;
            });
            //TODO: MORE TESTS FOR ADD WITH FORCE PARAM ETC
        });
        describe("-- no error on duplicate in constructor", () => {

            let generateKeyStub: sinon.SinonStub;
            let mergerInstance: merger.SummaryMerger;
            beforeEach(() => {
                mergerInstance = new merger.SummaryMerger(false);
                generateKeyStub = sinon.stub(mergerInstance, "generateKey");
            })

            afterEach(() => {
                generateKeyStub.restore();
            });

            it("should throw error for duplicate", () => {
                generateKeyStub.onCall(0).returns("asdf");
                generateKeyStub.onCall(1).returns("asdf");
                mergerInstance.add(<any>{}, false);
                expect(mergerInstance.add.bind(this, <any>{}, false)).to.not.throw;
            });
            it("should not throw error", () => {
                generateKeyStub.onCall(0).returns("asdf");
                generateKeyStub.onCall(1).returns("asdf");
                mergerInstance.add(<any>{}, true);
                expect(mergerInstance.add.bind(this, <any>{}, true)).to.not.throw;
            });
            //TODO: MORE TESTS FOR ADD WITH FORCE PARAM ETC
        });
    });
});