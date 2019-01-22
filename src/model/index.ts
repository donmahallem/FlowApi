export interface DaySummary {

    [key: string]: DayData;
}
export interface MiniGraphData {
    calorieReportUrl: string;
    dailyGoalReportUrl: string;
    data: {
        calories: TimeValuePair;
        dailyGoal: TimeValuePair;
        date: number;
        distance: TimeValuePair;
        nightLowHr: TimeValuePair;
        sleepAverage: TimeValuePair;
        sleepPlus: boolean;
    },
    distanceReportUrl: string;
    sampleDate: number;
    sleepAvgReportUrl: string;
}
export interface DayData {
    activityGraphData: ActivityGraphData;
    miniGraphData: MiniGraphData;
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

export * from './sleep-item';