import * as index from "./index";
import { expect } from "chai";
import "mocha";

describe("index", () => {
    it("should contain FlowApiValidator", () => {
        expect(index.FlowApiValidator).to.exist;
    });
});