export interface DaySummary {

    [key: string]: DayData;
}

export interface DayData {
    activityGraphData: ActivityGraphData;
}
export interface ActivityGraphData {
    heartRateTimelineSamples: TimeValuePair[];
    heartRateSummary: HeartRateSummary;
    activityZoneLimits: number[];
    activityTimelineSamples: TimeValuePair[];
}

export interface TimeValuePair {
    time: number;
    value: number;
}

export interface HeartRateSummary {
    dayMaximum: number;
    dayMaximumDateTime: number;
    dayMinimum: number;
    dayMinimumDateTime: number;
    nightMinimum: number;
    nightMinimumDateTime: number;
}
import * as fs from "fs";

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

    public static loadData(filename: string): Promise<DaySummary> {
        return new Promise((resolve, reject) => {
            fs.readFile(filename, (err: NodeJS.ErrnoException, data: Buffer) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(JSON.parse(data.toString("utf-8")));
                }
            });
        });
    }
}