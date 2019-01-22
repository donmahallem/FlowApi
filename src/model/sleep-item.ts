export interface NightSleep {
    id: number;
    night: string;
    sleepEndOffset: number;
    sleepEndTime: string;
    sleepGoal: number;
    sleepRating: null | "SLEPT_NEITHER_BAD_NOR_WELL";
    sleepStartOffset: number;
    sleepStartTime: string;
}

export interface SleepInterval {
    sleepWakeState: number;
    offsetFromStart: number;
    longInterruption: boolean;
}

export interface SleepEvaluationData {
    asleep: number;
    continuityClass: number;
    continuityIndex: number;
    efficiencyPercent: number;
    longFeedback: string;
    longInterruptionCount: number;
    longInterruptionDuration: number;
    shortFeedback: string;
    shortInterruptionCount: number;
    shortInterruptionDuration: number;
    sleepRatioPercentage: number;
    sleepSpan: number;
    totalInterruptionCount: number;
    totalInterruptionDuration: number;
}

export interface SleepSummary {
    date: string;
    nightSleep: NightSleep;
    sleepEvaluationData: SleepEvaluationData;
}

export interface SleepNearby {
    nextNight: SleepSummary;
    previousNights: SleepSummary[];
}