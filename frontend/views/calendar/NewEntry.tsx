import {TextField} from "@hilla/react-components/TextField";
import {EmailField} from "@hilla/react-components/EmailField";
import {Select, SelectItem} from "@hilla/react-components/Select";
import {Button} from "@hilla/react-components/Button";
import {useForm} from "@hilla/react-form";
import {useEffect, useState} from "react";

import {CalendarService} from "Frontend/generated/endpoints";
import CalendarEntryRecordModel from "Frontend/generated/com/example/application/services/CalendarService/CalendarEntryRecordModel";
import CalendarEntryRecord from "Frontend/generated/com/example/application/services/CalendarService/CalendarEntryRecord";

interface CalendarEntryFormProps {
    calendarEntry?: CalendarEntryRecord | null;
    onSubmit?: (contact: CalendarEntryRecord) => Promise<void>;
}

export default function CalendarEntryForm({calendarEntry, onSubmit}: CalendarEntryFormProps) {

    const [companies, setCompanies] = useState<SelectItem[]>([]);

    const {field, model, submit, reset, read} = useForm(CalendarEntryRecordModel, { onSubmit } );

    useEffect(() => {
        read(calendarEntry);
    }, [calendarEntry]);

    useEffect(() => {
        getCompanies();
    }, []);

    async function getCompanies() {
        const companies = await CRMService.findAllCompanies();
        const companyItems = companies.map(company => {
            return {
                label: company.name,
                value: company.id + ""
            };
        });
        setCompanies(companyItems);
    }

    return (
        <div className="flex flex-col gap-s items-start">

            <TextField label="First name" {...field(model.firstName)} />
            <TextField label="Last name" {...field(model.lastName)} />
            <EmailField label="Email" {...field(model.email)} />
            <Select label="Company" items={companies} {...field(model.company.id)} />

            <div className="flex gap-m">
                <Button onClick={submit} theme="primary">Save</Button>
                <Button onClick={reset}>Reset</Button>
            </div>
        </div>
    )
}