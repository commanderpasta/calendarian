import { ViewConfig } from "@vaadin/hilla-file-router/types.js";
import { EndpointError } from "@vaadin/hilla-frontend";
import { UserService } from "Frontend/generated/endpoints";
import { useEffect, useMemo, useState } from "react";
import { Notification } from "@vaadin/react-components/Notification";
import { Grid, GridTreeColumn, GridColumn, GridDataProvider } from "@vaadin/react-components";

export const config: ViewConfig = {
    loginRequired: true,
    rolesAllowed: ["ROLE_ADMIN"]
};

export default function Admin() {
    const [users, setUsers] = useState<Record<string, string[]>>({});

    {
        users;
    }
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

    type UserRights = {
        user: string;
        authorities: string;
    };
    const gridData: UserRights[] = useMemo(
        () =>
            Object.entries(users).map(([user, authorities]) => {
                return { user: user, authorities: authorities.toString() };
            }),
        [users]
    );

    return (
        <main>
            <Grid items={gridData}>
                <GridColumn path="user" />
                <GridColumn path="authorities" />
            </Grid>
        </main>
    );
}
