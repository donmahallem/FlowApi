import * as merger from "./summary-merger";
import { expect } from "chai";
import * as sinon from "sinon";
import "mocha";

describe("SummaryMerger", () => {
    describe("add", () => {
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
            mergerInstance.add(<any>{});
            expect(mergerInstance.add.bind(this, <any>{})).to.throw;
        });
        it("should not throw error", () => {
            generateKeyStub.onCall(0).returns("asdf");
            generateKeyStub.onCall(1).returns("asdf2");
            mergerInstance.add(<any>{});
            expect(mergerInstance.add.bind(this, <any>{})).to.not.throw;
        });
    });
});