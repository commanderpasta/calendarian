import { useEffect, useState } from "react";
import CalendarEntryForm from "../../components/CalendarEntryForm";
import CalendarEntryRecord from "Frontend/generated/com/ianmatos/calendarian/services/CalendarService/CalendarEntryRecord";
import { CalendarService } from "Frontend/generated/endpoints";
import dayjs from "dayjs";
import { ViewConfig } from "@vaadin/hilla-file-router/types.js";
import { Notification } from "@vaadin/react-components/Notification";
import { Button } from "@vaadin/react-components";
import { computed, signal, useSignal } from "@vaadin/hilla-react-signals";
import { EndpointError } from "@vaadin/hilla-frontend";

export const config: ViewConfig = {
    loginRequired: true
};

const selectedCalendarEntry = signal<CalendarEntryRecord | null>(null);

export default function YourCalendar() {
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
        } catch (error) {
            console.error("Error saving calendar entry:", error);
            Notification.show("Failed to save entry. Please try again.", {
                position: "top-center",
                duration: 3000,
                theme: "error"
            });
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

    const selectedDay = computed(() => selectedCalendarEntry.value?.date);
    const clickableDates = computed((): { day: string; month: string }[] => {
        let startDate = dayjs(selectedDay.value).subtract(2, "days");
        const retVal = [{ day: startDate.format("DD"), month: startDate.format("MMM") }];

        for (let i = 0; i < 4; i++) {
            startDate = startDate.add(1, "day");
            retVal.push({ day: startDate.format("DD"), month: startDate.format("MMM") });
        }

        return retVal;
    });

    return (
        <main>
            <header className="w-full flex justify-center gap-3 mt-2">
                {clickableDates.value.map((val) => (
                    <Button className="h-max" key={val.day}>
                        <div className="!my-0">
                            <div>{val.day}</div>
                            <div>{val.month}</div>
                        </div>
                    </Button>
                ))}
            </header>
            <div className="m-4">
                <CalendarEntryForm calendarEntry={selectedCalendarEntry.value} />
            </div>
        </main>
    );
}
