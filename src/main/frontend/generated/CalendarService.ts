import { EndpointRequestInit as EndpointRequestInit_1 } from "@vaadin/hilla-frontend";
import type CalendarEntryRecord_1 from "./com/example/application/services/CalendarService/CalendarEntryRecord.js";
import client_1 from "./connect-client.default.js";
async function findCalendarOfUser_1(userId: number, init?: EndpointRequestInit_1): Promise<Array<CalendarEntryRecord_1>> { return client_1.call("CalendarService", "findCalendarOfUser", { userId }, init); }
async function save_1(calendarEntry: CalendarEntryRecord_1, init?: EndpointRequestInit_1): Promise<CalendarEntryRecord_1> { return client_1.call("CalendarService", "save", { calendarEntry }, init); }
export { findCalendarOfUser_1 as findCalendarOfUser, save_1 as save };
