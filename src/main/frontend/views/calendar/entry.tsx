import { TextField } from "@vaadin/react-components/TextField";
import { Select, SelectItem } from "@vaadin/react-components/Select";
import { Button } from "@vaadin/react-components/Button";
import { useForm, useFormPart } from "@vaadin/hilla-react-form";
import { useEffect, useState } from "react";

import CalendarEntryRecordModel from "Frontend/generated/com/ianmatos/calendarian/services/CalendarService/CalendarEntryRecordModel";
import CalendarEntryRecord from "Frontend/generated/com/ianmatos/calendarian/services/CalendarService/CalendarEntryRecord";
import Mood from "Frontend/generated/com/ianmatos/calendarian/data/calendar/CalendarEntry/Mood";
import { DatePicker } from "@vaadin/react-components/DatePicker.js";
import { ViewConfig } from "@vaadin/hilla-file-router/types.js";
import dayjs from "dayjs";
import { _validators } from "@vaadin/hilla-lit-form";
import { IntegerField } from "@vaadin/react-components";

export const config: ViewConfig = {
    loginRequired: true,
    menu: {
        exclude: true
    }
};

interface CalendarEntryFormProps {
    calendarEntry?: CalendarEntryRecord | null;
    onSubmit?: (contact: CalendarEntryRecord) => Promise<void>;
}

export default function CalendarEntryForm({ calendarEntry, onSubmit }: CalendarEntryFormProps) {
    const [moods, setMoods] = useState<SelectItem[]>([]);

    const { field, model, submit, reset, read, dirty, setDefaultValue, value } = useForm(CalendarEntryRecordModel, {
        onSubmit
    });

    useEffect(() => {
        setDefaultValue({
            date: dayjs().format("YYYY-MM-DD"),
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
                    label: (mood.toString() as string).toLowerCase(),
                    value: mood.toString()
                };
            })
        );
    }, []);

    return (
        <div className="flex flex-col gap-s items-start">
            <DatePicker max={dayjs().toISOString()} label="Date" required {...field(model.date)} />
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
            <TextField label="Notes" {...field(model.note)} />
            <div className="flex gap-m">
                <Button onClick={submit} disabled={!dirty} theme="primary">
                    Save
                </Button>
            </div>
        </div>
    );
}
