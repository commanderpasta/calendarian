import { Select, SelectItem } from "@vaadin/react-components/Select";
import { Button } from "@vaadin/react-components/Button";
import { useForm } from "@vaadin/hilla-react-form";
import { useEffect, useState } from "react";

import CalendarEntryRecordModel from "Frontend/generated/com/ianmatos/calendarian/services/CalendarService/CalendarEntryRecordModel";
import CalendarEntryRecord from "Frontend/generated/com/ianmatos/calendarian/services/CalendarService/CalendarEntryRecord";
import Mood from "Frontend/generated/com/ianmatos/calendarian/data/calendar/CalendarEntry/Mood";
import { DatePicker } from "@vaadin/react-components/DatePicker.js";
import { ViewConfig } from "@vaadin/hilla-file-router/types.js";
import dayjs from "dayjs";
import { _validators } from "@vaadin/hilla-lit-form";
import { IntegerField, TextArea } from "@vaadin/react-components";
import { useSignal } from "@vaadin/hilla-react-signals";
import { getRandomHelperText } from "Frontend/util/helper-text-gen";
import { prettyPrintMood } from "Frontend/util/mood-text";

export const config: ViewConfig = {
    loginRequired: true,
    menu: {
        exclude: true
    }
};

interface CalendarEntryFormProps {
    opened?: boolean;
    calendarEntry?: CalendarEntryRecord | null;
    onSubmit?: (contact: CalendarEntryRecord) => Promise<void>;
    selectedDate?: dayjs.Dayjs;
}

export default function CalendarEntryForm({ calendarEntry, onSubmit, opened, selectedDate }: CalendarEntryFormProps) {
    const helperText = useSignal(getRandomHelperText());
    const [moods, setMoods] = useState<SelectItem[]>([]);

    const { field, model, submit, reset, read, dirty, setDefaultValue } = useForm(CalendarEntryRecordModel, {
        onSubmit
    });

    useEffect(() => {
        setDefaultValue({
            date: selectedDate?.format("YYYY-MM-DD") ?? dayjs().format("YYYY-MM-DD"),
            mood: Mood.VERYPOSITIVE,
            hoursOfSleep: 8
        });

        if (calendarEntry) {
            read(calendarEntry);
        } else {
            reset(); // use default values for new entry
        }

        setMoods(
            Object.values(Mood).map((mood) => {
                return {
                    label: prettyPrintMood[mood],
                    value: mood.toString()
                };
            })
        );
    }, [calendarEntry, selectedDate]);

    useEffect(() => {
        if (opened) {
            helperText.value = getRandomHelperText();
        }
    }, [opened]);

    return (
        <div className="flex flex-col gap-s items-start w-full">
            {!selectedDate && (
                <DatePicker max={dayjs().format("YYYY-MM-DD")} label="Date" required {...field(model.date)} />
            )}

            <Select label="Mood" required items={moods} {...field(model.mood)} />
            <IntegerField
                label="Sleep duration"
                stepButtonsVisible
                min={0}
                max={48}
                className="[&_:is(vaadin-input-container)]:max-w-24 "
                {...field(model.hoursOfSleep)}
            >
                <div slot="suffix">h</div>
            </IntegerField>
            <TextArea
                label="Notes"
                helperText={helperText.value}
                className="w-full min-h-24 max-h-40"
                {...field(model.note)}
            />
            <div className="flex gap-m">
                <Button onClick={submit} disabled={!dirty && !!calendarEntry} theme="primary">
                    Save
                </Button>
            </div>
        </div>
    );
}
