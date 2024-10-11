import { useEffect, useState } from "react";
import NewEntry from "./entry";
import CalendarEntryRecord from "Frontend/generated/com/ianmatos/calendarian/services/CalendarService/CalendarEntryRecord";
import { CalendarService } from "Frontend/generated/endpoints";
import dayjs from "dayjs";
import CalendarElement from "../../components/CalendarElement";
import { ViewConfig } from "@vaadin/hilla-file-router/types.js";
import LoadingIndicator from "Frontend/components/LoadingIndicator";
import { Notification } from "@vaadin/react-components/Notification";

export const config: ViewConfig = {
    loginRequired: true
};

export default function CalendarView() {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [calendarByDay, setCalendarByDay] = useState<Map<Date, CalendarEntryRecord>>(
        new Map<Date, CalendarEntryRecord>()
    );

    const [isAddingEntry, setAddingEntry] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<boolean>(false);

    let spinnerTimeout: number;
    useEffect(() => {
        spinnerTimeout = setTimeout(() => {
            setLoading(true);
        }, 150);
        (CalendarService.findMyCalendar() as Promise<CalendarEntryRecord[]>).then(initCalendar);
    }, []);

    function initCalendar(entries: CalendarEntryRecord[]): void {
        const calendarMap = new Map<Date, CalendarEntryRecord>();
        entries.map((entry) => calendarMap.set(dayjs(entry.date).toDate(), entry));

        setCalendarByDay(calendarMap);
        clearTimeout(spinnerTimeout);
        setLoading(false);
    }

    async function onCalendarEntrySaved(calendarEntry: CalendarEntryRecord) {
        const saved = await CalendarService.save(calendarEntry);

        if (saved) {
            setCalendarByDay((calendarMap) => calendarMap.set(new Date(saved.date), saved));
            setAddingEntry(false);
            const notification = Notification.show("Entry was saved successfully.", {
                position: "top-center",
                duration: 3000,
                theme: "success"
            });
        }
    }

    function deleteEntry(key: Date) {
        const updatedMap = new Map(calendarByDay);
        updatedMap.delete(key);
        setCalendarByDay(updatedMap);
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
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.from(calendarByDay.entries()).map(([key, value]) => (
                        <CalendarElement key={key.toString()} calendarEntry={value} onDelete={() => deleteEntry(key)} />
                    ))}
                </tbody>
            </table>

            {isLoading && (
                <div className="w-full my-5">
                    <LoadingIndicator />
                </div>
            )}

            <button onClick={(e) => setAddingEntry(true)} type="button">
                Add entry
            </button>

            {isAddingEntry && <NewEntry onSubmit={onCalendarEntrySaved} />}
        </div>
    );
}
