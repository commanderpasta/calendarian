import { useEffect, useState } from "react";
import CalendarEntryForm from "../../components/CalendarEntryForm";
import CalendarEntryRecord from "Frontend/generated/com/ianmatos/calendarian/services/CalendarService/CalendarEntryRecord";
import { CalendarService } from "Frontend/generated/endpoints";
import dayjs from "dayjs";
import CalendarElement from "../../components/TableCalendarElement";
import { ViewConfig } from "@vaadin/hilla-file-router/types.js";
import LoadingIndicator from "Frontend/components/LoadingIndicator";
import { Notification } from "@vaadin/react-components/Notification";
import { Button, Dialog } from "@vaadin/react-components";
import { useSignal } from "@vaadin/hilla-react-signals";

export const config: ViewConfig = {
    loginRequired: true
};

export default function CalendarView() {
    const isDialogOpen = useSignal(false);
    const selectedCalendarEntry = useSignal<CalendarEntryRecord | null>(null);
    const calendarByDay = useSignal(new Map<string, CalendarEntryRecord>());

    const [isLoading, setLoading] = useState<boolean>(false);

    let spinnerTimeout: number;
    useEffect(() => {
        spinnerTimeout = setTimeout(() => {
            setLoading(true);
        }, 150);
        (CalendarService.findMyCalendar() as Promise<CalendarEntryRecord[]>).then(initCalendar);
    }, []);

    function initCalendar(entries: CalendarEntryRecord[]): void {
        entries.map((entry) => calendarByDay.value.set(entry.date, entry));

        clearTimeout(spinnerTimeout);
        setLoading(false);
    }

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
        calendarByDay.value.delete(key);
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
                    {Array.from(calendarByDay.value.entries())
                        .sort((a, b) => dayjs(a[0]).unix() - dayjs(b[0]).unix())
                        .map(([key, value]) => (
                            <CalendarElement
                                key={key.toString()}
                                calendarEntry={value}
                                onEdit={() => editEntry(key)}
                                onDeleted={() => deleteEntry(key)}
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
