/**
 * @fileoverview Route-level page component for browsing administrative RoleType records.
 */

import {ReactElement} from 'react';
import {QueryDataLoader} from "@/views/shared/_feat";
import {generateArraySchema, RoleType, RoleTypeSchema} from "@noovies-tickets/common";
import {useFetchRoleTypes, useRoleTypeIndexQueryOptionsContext} from "@/domains/role-types/_feat";
import {RoleTypeListPageContent} from "@/views/admin/role-types/_pages/list-page/content.tsx";
import {useSetAdminPageTitle} from "@/shared/_feat";

/** Primary entry point for the Role Type List administrative view. */
export function RoleTypeListPage(): ReactElement {
    useSetAdminPageTitle({presetTitle: "Role Types"})
    const {values: queries} = useRoleTypeIndexQueryOptionsContext();

    const query = useFetchRoleTypes({
        schema: generateArraySchema(RoleTypeSchema),
        queries,
    });

    return (
        <QueryDataLoader query={query}>
            {(data: RoleType[]) => <RoleTypeListPageContent roleTypes={data}/>}
        </QueryDataLoader>
    );
}