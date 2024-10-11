import { useEffect, useState } from "react";
import CalendarEntryForm from "../../components/CalendarEntryForm";
import CalendarEntryRecord from "Frontend/generated/com/ianmatos/calendarian/services/CalendarService/CalendarEntryRecord";
import { CalendarService } from "Frontend/generated/endpoints";
import dayjs from "dayjs";
import { ViewConfig } from "@vaadin/hilla-file-router/types.js";
import LoadingIndicator from "Frontend/components/LoadingIndicator";
import { Notification } from "@vaadin/react-components/Notification";
import { Button, Dialog, Grid, GridColumn, Icon } from "@vaadin/react-components";
import { signal, useSignal } from "@vaadin/hilla-react-signals";
import { EndpointError } from "@vaadin/hilla-frontend";

export const config: ViewConfig = {
    loginRequired: true
};

const selectedCalendarEntry = signal<CalendarEntryRecord | null>(null);

export default function HistoryView() {
    const isDialogOpen = useSignal(false);
    const [isLoading, setLoading] = useState<boolean>(true);
    const [calendarEntries, setCalendarEntries] = useState<CalendarEntryRecord[]>([]); // did not work with useSignal

    useEffect(() => {
        const fetchData = async () => {
            try {
                const entries = await CalendarService.findMyCalendar();
                setCalendarEntries(entries);
                setLoading(false);
            } catch (e) {
                if (e instanceof EndpointError) {
                    Notification.show("Error while loading your calendar " + e.message, {
                        duration: 5000,
                        position: "top-center",
                        theme: "error"
                    });
                }

                setLoading(false);
            }
        };

        fetchData();
    }, []);

    async function onCalendarEntrySaved(calendarEntry: CalendarEntryRecord) {
        try {
            const saved = await CalendarService.save(calendarEntry);

            if (saved) {
                setCalendarEntries((prevEntries) => {
                    const updatedEntries = prevEntries.filter((entry) => entry.date !== saved.date);
                    return [...updatedEntries, saved];
                });

                isDialogOpen.value = false;
                Notification.show("Entry was saved successfully.", {
                    position: "top-center",
                    duration: 3000,
                    theme: "success"
                });
            }
        } catch (e) {
            if (e instanceof EndpointError) {
                Notification.show("Failed to save entry. " + e.message, {
                    position: "top-center",
                    duration: 3000,
                    theme: "error"
                });
            }
        }
    }

    function deleteEntry(calendarKey: string) {
        setCalendarEntries((prevEntries) => prevEntries.filter((entry) => entry.date !== calendarKey));
    }

    function editEntry(calendarKey: string) {
        openEditingModal(calendarKey);
    }

    function openEditingModal(calendarKey?: string) {
        if (calendarKey) {
            selectedCalendarEntry.value = calendarEntries.find((entry) => entry.date === calendarKey) ?? null;
        } else {
            selectedCalendarEntry.value = null;
        }

        isDialogOpen.value = true;
    }

    const sortedEntries = calendarEntries.sort((a, b) => dayjs(a.date).unix() - dayjs(b.date).unix());

    return (
        <div className="m-4">
            <h2 className="text-xl font-bold">Calendar</h2>
            {isLoading ? (
                <div className="w-full my-5">
                    <LoadingIndicator />
                </div>
            ) : (
                <>
                    <Grid items={sortedEntries} theme="wrap-cell-content row-stripes">
                        <GridColumn path="date" />
                        <GridColumn path="mood" />
                        <GridColumn path="hoursOfSleep" />
                        <GridColumn path="note" />
                        <GridColumn header="Status">
                            {({ item }) => (
                                <span className="flex gap-2 max-w-fit">
                                    <Button theme="icon" onClick={() => editEntry(item.date)}>
                                        <Icon icon="vaadin:edit" />
                                    </Button>
                                    <Button theme="icon" onClick={() => deleteEntry(item.date)}>
                                        <Icon icon="vaadin:minus-circle" />
                                    </Button>
                                </span>
                            )}
                        </GridColumn>
                    </Grid>

                    {sortedEntries?.length === 0 && (
                        <div className="w-full flex justify-center">
                            <span>Nothing here yet.</span>
                        </div>
                    )}

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
                </>
            )}
        </div>
    );
}
