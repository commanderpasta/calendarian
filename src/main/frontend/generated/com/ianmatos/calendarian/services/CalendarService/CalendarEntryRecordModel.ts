import { _getPropertyModel as _getPropertyModel_1, makeObjectEmptyValueCreator as makeObjectEmptyValueCreator_1, NumberModel as NumberModel_1, ObjectModel as ObjectModel_1, PositiveOrZero as PositiveOrZero_1, StringModel as StringModel_1 } from "@vaadin/hilla-lit-form";
import MoodModel_1 from "../../data/calendar/CalendarEntry/MoodModel.js";
import type CalendarEntryRecord_1 from "./CalendarEntryRecord.js";
class CalendarEntryRecordModel<T extends CalendarEntryRecord_1 = CalendarEntryRecord_1> extends ObjectModel_1<T> {
    static override createEmptyValue = makeObjectEmptyValueCreator_1(CalendarEntryRecordModel);
    get id(): NumberModel_1 {
        return this[_getPropertyModel_1]("id", (parent, key) => new NumberModel_1(parent, key, true, { meta: { javaType: "java.lang.Long" } }));
    }
    get date(): StringModel_1 {
        return this[_getPropertyModel_1]("date", (parent, key) => new StringModel_1(parent, key, true, { meta: { javaType: "java.time.LocalDate" } }));
    }
    get mood(): MoodModel_1 {
        return this[_getPropertyModel_1]("mood", (parent, key) => new MoodModel_1(parent, key, true));
    }
    get hoursOfSleep(): NumberModel_1 {
        return this[_getPropertyModel_1]("hoursOfSleep", (parent, key) => new NumberModel_1(parent, key, false, { validators: [new PositiveOrZero_1()], meta: { javaType: "int" } }));
    }
    get note(): StringModel_1 {
        return this[_getPropertyModel_1]("note", (parent, key) => new StringModel_1(parent, key, true, { meta: { javaType: "java.lang.String" } }));
    }
}
export default CalendarEntryRecordModel;
