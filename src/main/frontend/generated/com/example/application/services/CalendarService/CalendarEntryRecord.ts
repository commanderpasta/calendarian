import type Mood_1 from "../../data/CalendarEntry/Mood.js";
interface CalendarEntryRecord {
    id: number;
    date: string;
    mood: Mood_1;
    hoursOfSleep: number;
    userId: number;
    note: string;
}
export default CalendarEntryRecord;
