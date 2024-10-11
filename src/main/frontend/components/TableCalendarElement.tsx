import { EndpointError } from "@vaadin/hilla-frontend";
import { Button, Icon } from "@vaadin/react-components";
import { Notification } from "@vaadin/react-components/Notification";
import CalendarEntryRecord from "Frontend/generated/com/ianmatos/calendarian/services/CalendarService/CalendarEntryRecord";
import { CalendarService } from "Frontend/generated/endpoints";
import dayjs from "dayjs";

interface CalendarElementProps {
    calendarEntry: CalendarEntryRecord;
    onDeleted?: () => void;
    onEdit?: () => void;
}

export default function CalendarElement(props: CalendarElementProps) {
    function editEntry() {
        if (props.onEdit) {
            props.onEdit();
        }
    }

    async function deleteEntry() {
        try {
            await CalendarService.deleteById(props.calendarEntry.id);
            if (props.onDeleted) {
                props.onDeleted();
            }
        } catch (e) {
            if (e instanceof EndpointError) {
                Notification.show("Error while deleting element: " + e.message, {
                    position: "top-center",
                    duration: 3000,
                    theme: "error"
                });
            }
        }
    }

    return (
        <tr className="bg-slate-100">
            <td>{dayjs(props.calendarEntry.date).format("YYYY-MM-DD")}</td>
            <td>{props.calendarEntry.mood}</td>
            <td>{props.calendarEntry.hoursOfSleep}</td>
            <td>{props.calendarEntry.note}</td>
            <td className="flex gap-2">
                <Button theme="icon" onClick={editEntry}>
                    <Icon icon="vaadin:edit" />
                </Button>
                <Button theme="icon" onClick={deleteEntry}>
                    <Icon icon="vaadin:minus-circle" />
                </Button>
            </td>
        </tr>
    );
}
