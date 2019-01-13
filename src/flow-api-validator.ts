import { DaySummary } from "./model";
import * as jsonschema from "jsonschema";
import { addressSchema } from "./schemas/day-summary";

export class FlowApiValidator {
    public static validateTimelineSummary(data: DaySummary | any): jsonschema.ValidatorResult {
        const val: jsonschema.Validator = new jsonschema.Validator();
        val.addSchema(addressSchema);
        return val.validate(data, addressSchema);
    }

    public static validateTimelineSummaryPromise(data: DaySummary | any): Promise<jsonschema.ValidatorResult> {
        return new Promise((resolve, reject) => {
            const result: jsonschema.ValidatorResult = this.validateTimelineSummary(data);
            resolve(result);
        });
    }
}