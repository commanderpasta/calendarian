import { EndpointRequestInit as EndpointRequestInit_1 } from "@vaadin/hilla-frontend";
import type CalendarEntryRecord_1 from "./com/ianmatos/calendarian/services/CalendarService/CalendarEntryRecord.js";
import client_1 from "./connect-client.default.js";
async function findMyCalendar_1(init?: EndpointRequestInit_1): Promise<Array<CalendarEntryRecord_1 | undefined> | undefined> { return client_1.call("CalendarService", "findMyCalendar", {}, init); }
async function save_1(calendarEntry: CalendarEntryRecord_1 | undefined, init?: EndpointRequestInit_1): Promise<CalendarEntryRecord_1 | undefined> { return client_1.call("CalendarService", "save", { calendarEntry }, init); }
export { findMyCalendar_1 as findMyCalendar, save_1 as save };
