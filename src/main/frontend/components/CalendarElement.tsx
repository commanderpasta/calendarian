import CalendarEntryRecord from "Frontend/generated/com/example/application/services/CalendarService/CalendarEntryRecord";
import dayjs from "dayjs";

interface CalendarElementProps {
    calendarEntry: CalendarEntryRecord,
}

export default function CalendarElement(props: CalendarElementProps) {
    return (
        <tr className="bg-slate-100">
            <td>{dayjs(props.calendarEntry.date).format("YYYY-MM-DD")}</td>
            <td>{props.calendarEntry.mood}</td>
            <td>{props.calendarEntry.hoursOfSleep}</td>
            <td>{props.calendarEntry.note}</td>
        </tr>
    )
}