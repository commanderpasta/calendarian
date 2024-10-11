import { useEffect, useState } from "react";
import CalendarEntryForm from "../../components/CalendarEntryForm";
import CalendarEntryRecord from "Frontend/generated/com/ianmatos/calendarian/services/CalendarService/CalendarEntryRecord";
import { CalendarService } from "Frontend/generated/endpoints";
import dayjs from "dayjs";
import { ViewConfig } from "@vaadin/hilla-file-router/types.js";
import { Notification } from "@vaadin/react-components/Notification";
import { Button } from "@vaadin/react-components";
import { computed } from "@vaadin/hilla-react-signals";
import { EndpointError } from "@vaadin/hilla-frontend";

export const config: ViewConfig = {
    loginRequired: true
};

export default function DailyCalendar() {
    const [calendarEntry, setCalendarEntry] = useState<CalendarEntryRecord>();
    const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs>(dayjs());

    useEffect(() => {
        const fetchData = async (date: dayjs.Dayjs) => {
            try {
                const entry = await CalendarService.findOneByDate(date.format("YYYY-MM-DD"));
                setCalendarEntry(entry);
            } catch (e) {
                if (e instanceof EndpointError) {
                    Notification.show("Error while loading your calendar " + e.message, {
                        duration: 5000,
                        position: "top-center",
                        theme: "error"
                    });
                }
            }
        };

        fetchData(selectedDate);
    }, [selectedDate]);

    async function onCalendarEntrySaved(calendarEntry: CalendarEntryRecord) {
        try {
            const saved = await CalendarService.save(calendarEntry);

            if (saved) {
                setCalendarEntry(saved);

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

    const clickableDates = computed((): dayjs.Dayjs[] => {
        let currentDate = selectedDate.subtract(2, "days");
        const retVal = [currentDate];

        for (let i = 0; i < 4; i++) {
            currentDate = currentDate.add(1, "day");
            retVal.push(currentDate);
        }

        return retVal;
    });

    return (
        <main>
            <header className="w-full flex justify-center gap-3 mt-2">
                {clickableDates.value.map((val, index) => (
                    <Button
                        className="h-max"
                        theme={index === 2 ? "primary" : ""}
                        key={val.unix()}
                        onClick={() => setSelectedDate(val)}
                    >
                        <div className="!my-0">
                            <div>{val.format("DD")}</div>
                            <div>{val.format("MMM")}</div>
                        </div>
                    </Button>
                ))}
            </header>
            <div className="p-4 flex !justify-center w-full">
                <div className="bg-gray-50 border-2 rounded-2xl !p-4 [&_>_*]:!w-96">
                    <CalendarEntryForm
                        selectedDate={selectedDate}
                        calendarEntry={calendarEntry}
                        onSubmit={onCalendarEntrySaved}
                    />
                </div>
            </div>
        </main>
    );
}
