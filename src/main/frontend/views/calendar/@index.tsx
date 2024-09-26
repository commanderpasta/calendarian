import { useEffect, useState } from "react";
import NewEntry from "./NewEntry";
import CalendarEntryRecord from "Frontend/generated/com/example/application/services/CalendarService/CalendarEntryRecord";
import { CalendarService } from "Frontend/generated/endpoints";
import dayjs from "dayjs";


function initCalendar(entries: CalendarEntryRecord[]): Map<Date, CalendarEntryRecord> {
  const calendarMap = new Map<Date, CalendarEntryRecord>();
  entries.map(entry => calendarMap.set(dayjs(entry.date).toDate(), entry));

  return calendarMap;
}

export default function CalendarView() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [calendarByDay, setCalendarByDay] = useState<Map<Date, CalendarEntryRecord>>(new Map<Date, CalendarEntryRecord>());

  const [isAddingEntry, setAddingEntry] = useState<boolean>(false);

  useEffect(() => {
    CalendarService.findCalendarOfUser(1).then(initCalendar);
  }, []);

  async function onCalendarEntrySaved(calendarEntry: CalendarEntryRecord) {
    const saved = await CalendarService.save(calendarEntry);
    setCalendarByDay(calendarMap => calendarMap.set(new Date(saved.date), saved));
    setAddingEntry(false);
  }

  return (
    <div className="m-4">
      <h2 className="text-xl font-bold">Calendar</h2>
      {Array.from(calendarByDay.entries()).map(([key, value]) => (
        <div key={key.toString()}>
          Key: {key.toString()}, Value: {value.note}
        </div>
      ))}

      <button onClick={e => setAddingEntry(true)} type="button">
        Add entry
      </button>

      {isAddingEntry &&
        <NewEntry onSubmit={onCalendarEntrySaved}/>
      }
    </div>
  );
}
