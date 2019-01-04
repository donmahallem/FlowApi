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

export const loadData = (filename: string): Promise<DaySummary> => {
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