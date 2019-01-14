import { DayData, DaySummary } from "./model";

export class SummaryMerger {
    private data: DaySummary = {};
    constructor() {
    }

    /**
     * generates the day key
     * @param day the day the key to generate from
     */
    public generateKey(day: DayData): string {
        const timestamp: number = day.miniGraphData.data.date;
        const dateObj: Date = new Date(timestamp);
        return dateObj.toISOString();
    }

    /**
     * Adds a day
     * @param day the day to be added
     * @param force force insert
     */
    public add(day: DayData, force: boolean = false, key: string = null): void {
        const dayKey: string = key ? key : this.generateKey(day);
        if (this.data[dayKey] && force === false) {
            throw new Error("Day already exists in merge");
        }
        this.data[dayKey] = day;
    }

    public addSummary(summary: DaySummary): void {
        for (let key of Object.keys(summary)) {
            this.data[key] = summary[key];
        }
    }

    /**
     * Adds multiple days to the summary
     * @param days The days to be added
     * @param force 
     */
    public addAll(days: DayData[], force: boolean = false): void {
        for (let day of days) {
            this.add(day, force);
        }
    }

    /**
     * Gets the map
     */
    public get(): DaySummary {
        return this.data;
    }
}