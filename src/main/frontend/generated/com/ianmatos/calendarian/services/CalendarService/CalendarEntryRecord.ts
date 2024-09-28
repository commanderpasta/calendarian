import type Mood_1 from "../../data/calendar/CalendarEntry/Mood.js";
interface CalendarEntryRecord {
    id?: number;
    date?: string;
    mood?: Mood_1;
    hoursOfSleep: number;
    note?: string;
}
export default CalendarEntryRecord;
