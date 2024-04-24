import { useState } from "react";
import NewEntry from "./NewEntry";
import CalendarEntryRecord from "Frontend/generated/com/example/application/services/CalendarService/CalendarEntryRecord";
import { CalendarService } from "Frontend/generated/endpoints";
import dayjs from "dayjs";


function initCalendar(): Map<Date, CalendarEntryRecord> {
  const calendarMap = new Map<Date, CalendarEntryRecord>();

  let currentDate = dayjs().startOf("month");

  while (currentDate.isBefore(currentDate.endOf("month")) || currentDate.isSame(currentDate.endOf("month"))) {
    currentDate = currentDate.add(1, "day");
  }

  const [contacts, setContacts] = useState<ContactRecord[]>([]);
  const [selected, setSelected] = useState<ContactRecord | null | undefined>();
}

export default function CalendarView() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [calendarByDay, setCalendarByDay] = useState<Map<Date, CalendarEntryRecord>>(new Map<Date, CalendarEntryRecord>());

  const [isAddingEntry, setAddingEntry] = useState<boolean>(false);


  useEffect(() => {
    CRMService.findAllContacts().then(setContacts);
  }, []);

  async function onCalendarEntrySaved(calendarEntry: CalendarEntryRecord) {
    const saved = await CalendarService.save(calendarEntry);
    setCalendarByDay(calendarMap => calendarMap.set(new Date(saved.date), saved));
    setAddingEntry(false);
  }

  return (
    <div className="p-m">
      <h2>Calendar</h2>
      <button onClick={e => setAddingEntry(true)} type="button">
        Add entry
      </button>

      {isAddingEntry &&
        <NewEntry onSubmit={onCalendarEntrySaved}/>
      }
    </div>
  );
}
