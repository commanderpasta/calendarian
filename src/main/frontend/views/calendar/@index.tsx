import { useEffect, useState } from "react";
import NewEntry from "./NewEntry";
import CalendarEntryRecord from "Frontend/generated/com/example/application/services/CalendarService/CalendarEntryRecord";
import { CalendarService } from "Frontend/generated/endpoints";
import dayjs from "dayjs";
import CalendarElement from "../../components/CalendarElement";


export default function CalendarView() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [calendarByDay, setCalendarByDay] = useState<Map<Date, CalendarEntryRecord>>(new Map<Date, CalendarEntryRecord>());

  const [isAddingEntry, setAddingEntry] = useState<boolean>(false);

  useEffect(() => {
    CalendarService.findCalendarOfUser(1).then(initCalendar);
  }, []);

  function initCalendar(entries: CalendarEntryRecord[]): void {
    const calendarMap = new Map<Date, CalendarEntryRecord>();
    entries.map(entry => calendarMap.set(dayjs(entry.date).toDate(), entry));

    setCalendarByDay(calendarMap);
  }

  async function onCalendarEntrySaved(calendarEntry: CalendarEntryRecord) {
    const saved = await CalendarService.save(calendarEntry);
    setCalendarByDay(calendarMap => calendarMap.set(new Date(saved.date), saved));
    setAddingEntry(false);
  }

  return (
    <div className="m-4">
      <h2 className="text-xl font-bold">Calendar</h2>
      <table className="table-auto text-left w-full">
        <thead>
          <tr>
            <th>Date</th>
            <th>Mood</th>
            <th>Sleep (h)</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
          {Array.from(calendarByDay.entries()).map(([key, value]) => (
            <CalendarElement key={key.toString()} calendarEntry={value} />
          ))}

        </tbody>
      </table>

      <button onClick={e => setAddingEntry(true)} type="button">
        Add entry
      </button>

      {isAddingEntry &&
        <NewEntry onSubmit={onCalendarEntrySaved} />
      }
    </div>
  );
}
