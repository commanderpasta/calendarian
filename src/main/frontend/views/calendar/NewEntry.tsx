import {TextField} from "@vaadin/react-components/TextField";
import {Select, SelectItem} from "@vaadin/react-components/Select";
import {Button} from "@vaadin/react-components/Button";
import {useForm, useFormPart} from "@vaadin/hilla-react-form";
import {useEffect, useState} from "react";

import CalendarEntryRecordModel from "Frontend/generated/com/example/application/services/CalendarService/CalendarEntryRecordModel";
import CalendarEntryRecord from "Frontend/generated/com/example/application/services/CalendarService/CalendarEntryRecord";
import Mood from "Frontend/generated/com/example/application/data/CalendarEntry/Mood";
import { DatePicker } from "@vaadin/react-components/DatePicker.js";
import { NumberField } from "@vaadin/react-components/NumberField.js";

interface CalendarEntryFormProps {
    calendarEntry?: CalendarEntryRecord | null;
    onSubmit?: (contact: CalendarEntryRecord) => Promise<void>;
}

export default function CalendarEntryForm({calendarEntry, onSubmit}: CalendarEntryFormProps) {

    const [moods, setMoods] = useState<SelectItem[]>([]);

    const {field, model, submit, reset, read} = useForm(CalendarEntryRecordModel, { onSubmit } );
    const moodField = useFormPart(model.mood);

    useEffect(() => {
        read(calendarEntry ?? { userId: 1 });

        setMoods(Object.values(Mood).map(mood => {
            return {
                label: (mood.toString() as string).toLowerCase(),
                value: mood.toString(),
            };
        }));
    }, [calendarEntry]);

    return (
        <div className="flex flex-col gap-s items-start">

            <DatePicker label="Date" {...field(model.date)} />
            <Select label="Mood" items={moods} {...field(model.mood)} />
            <NumberField label="Sleep (in h)" {...field(model.hoursOfSleep)} />
            <TextField label="Notes" {...field(model.note)} />
            <div className="flex gap-m">
                <Button onClick={submit} theme="primary">Save</Button>
                <Button onClick={reset}>Reset</Button>
            </div>
        </div>
    )
}