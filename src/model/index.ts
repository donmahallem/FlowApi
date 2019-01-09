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