import { useEffect, useMemo, useState } from "react";
import CalendarEntryForm from "../../components/CalendarEntryForm";
import CalendarEntryRecord from "Frontend/generated/com/ianmatos/calendarian/services/CalendarService/CalendarEntryRecord";
import { CalendarService } from "Frontend/generated/endpoints";
import dayjs from "dayjs";
import CalendarElement from "../../components/TableCalendarElement";
import { ViewConfig } from "@vaadin/hilla-file-router/types.js";
import LoadingIndicator from "Frontend/components/LoadingIndicator";
import { Notification } from "@vaadin/react-components/Notification";
import { Button, Dialog } from "@vaadin/react-components";
import { signal, useSignal } from "@vaadin/hilla-react-signals";

export const config: ViewConfig = {
    loginRequired: true
};

// Reactivity with Map only appears to work outside of the function component
const calendarByDay = signal(new Map<string, CalendarEntryRecord>());
const selectedCalendarEntry = signal<CalendarEntryRecord | null>(null);

export default function CalendarView() {
    const isDialogOpen = useSignal(false);

    const [isLoading, setLoading] = useState<boolean>(false);

    let spinnerTimeout: number;
    useEffect(() => {
        spinnerTimeout = setTimeout(() => {
            setLoading(true);
        }, 150);
        (CalendarService.findMyCalendar() as Promise<CalendarEntryRecord[]>).then((entries) => {
            for (const entry of entries) {
                calendarByDay.value.set(entry.date, entry);
            }

            clearTimeout(spinnerTimeout);
            setLoading(false);
        });
    }, []);

    useEffect(() => {}, [calendarByDay.value]); // workaround: this fixes the table not rendering on initial page load after login

    async function onCalendarEntrySaved(calendarEntry: CalendarEntryRecord) {
        const saved = await CalendarService.save(calendarEntry);

        if (saved) {
            if (selectedCalendarEntry.value) {
                deleteEntry(saved.date);
            }

            calendarByDay.value.set(saved.date, saved);
            isDialogOpen.value = false;
            selectedCalendarEntry.value = null;
            Notification.show("Entry was saved successfully.", {
                position: "top-center",
                duration: 3000,
                theme: "success"
            });
        }
    }

    function deleteEntry(key: string) {
        const calendarCopy = new Map(calendarByDay.value);
        calendarCopy.delete(key);
        calendarByDay.value = calendarCopy;
    }

    function editEntry(key: string) {
        const entry = calendarByDay.value.get(key);
        if (entry) {
            selectedCalendarEntry.value = entry;
            isDialogOpen.value = true;
        }
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
                    {Array.from(calendarByDay.value.values())
                        .sort((a, b) => dayjs(a.date).unix() - dayjs(b.date).unix())
                        .map((entry) => (
                            <CalendarElement
                                key={entry.date}
                                calendarEntry={entry}
                                onEdit={() => editEntry(entry.date)}
                                onDeleted={() => deleteEntry(entry.date)}
                            />
                        ))}
                </tbody>
            </table>

            {isLoading && (
                <div className="w-full my-5">
                    <LoadingIndicator />
                </div>
            )}

            <div className="flex justify-start my-4">
                <Button onClick={(e) => (isDialogOpen.value = true)} theme="primary">
                    Add entry
                </Button>
            </div>

            <Dialog
                headerTitle="Edit calendar entry"
                opened={isDialogOpen.value}
                onOpenedChanged={({ detail }) => {
                    isDialogOpen.value = detail.value;
                }}
            >
                <div className="w-[400px]">
                    <CalendarEntryForm
                        onSubmit={onCalendarEntrySaved}
                        opened={isDialogOpen.value}
                        calendarEntry={selectedCalendarEntry.value}
                    />
                </div>
            </Dialog>
        </div>
    );
}
