import {ReactElement} from "react";
import {useSetAdminPageTitle} from "@/shared/_feat";
import {DashboardPageContent} from "@/views/admin/dashboard/pages/dashboard/content.tsx";
import {QueryDataLoader} from "@/views/shared/_feat";
import {useFetchAdminDashboardViewData} from "@/domains/pages/_feat/admin-view-data";

export function AdminDashboardPage(): ReactElement {
    useSetAdminPageTitle({presetTitle: "Dashboard"})

    const query = useFetchAdminDashboardViewData();

    return (
        <QueryDataLoader query={query}>
            {(data) => (
                <DashboardPageContent stats={data}/>
            )}
        </QueryDataLoader>

    );
}