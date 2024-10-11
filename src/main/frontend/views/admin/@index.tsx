import { ViewConfig } from "@vaadin/hilla-file-router/types.js";
import { EndpointError } from "@vaadin/hilla-frontend";
import { UserService } from "Frontend/generated/endpoints";
import { useEffect, useState } from "react";
import { Notification } from "@vaadin/react-components/Notification";

export const config: ViewConfig = {
    loginRequired: true,
    rolesAllowed: ["ROLE_ADMIN"]
};

export default function Admin() {
    const [users, setUsers] = useState<Record<string, string[]>>({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersWithAuthorities = await UserService.getAllUsers();
                setUsers(usersWithAuthorities);
            } catch (e) {
                if (e instanceof EndpointError) {
                    Notification.show("Error while loading users: " + e.message, {
                        duration: 5000,
                        position: "top-center",
                        theme: "error"
                    });
                }
            }
        };
        fetchData();
    }, []);

    return (
        <main>
            {Object.entries(users).map(([user, authorities]) => (
                <div key={user} className="flex">
                    <div>{user}</div>
                    <div>{authorities.join(", ")}</div>
                </div>
            ))}
        </main>
    );
}
