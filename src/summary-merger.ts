import { DayData, DaySummary } from "./model";

export class SummaryMerger {
    private errorOnDuplicate: boolean;
    private data: DaySummary = {};
    constructor(errorOnDuplicate: boolean = true) {
        this.errorOnDuplicate = errorOnDuplicate;
    }

    /**
     * generates the day key
     * @param day the day the key to generate from
     */
    public generateKey(day: DayData): string {
        return "key";
    }

    /**
     * Adds a day
     * @param day the day to be added
     * @param force force insert
     */
    public add(day: DayData, force: boolean = false): void {
        const dayKey: string = this.generateKey(day);
        if (this.errorOnDuplicate && this.data[dayKey] && force === false) {
            throw new Error("Day already exists in merge");
        }
        this.data[dayKey] = day;
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