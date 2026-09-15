/**
 * @fileoverview Route-level page component for browsing administrative RoleType records.
 */

import {ReactElement} from 'react';
import {useParsedSearchParams} from "@/shared/_feat/fetch-search-params";
import {generateArraySchema} from "@noovies-tickets/common";
import {QueryDataLoader} from "@/views/shared/_feat";
import {RoleType, RoleTypeSchema} from "@/domains/role-types/_schema";
import {RoleTypeQueryOptionsSchema, useFetchRoleTypes} from "@/domains/role-types/_feat";
import {RoleTypeListPageContent} from "@/views/admin/role-types/_pages/list-page/content.tsx";

/** Primary entry point for the Role Type List administrative view. */
export function RoleTypeListPage(): ReactElement {
    const {searchParams: queryOptions} = useParsedSearchParams({schema: RoleTypeQueryOptionsSchema});

    const query = useFetchRoleTypes({
        queries: queryOptions,
        schema: generateArraySchema(RoleTypeSchema),
    });

    return (
        <QueryDataLoader query={query}>
            {(data: RoleType[]) => <RoleTypeListPageContent roleTypes={data}/>}
        </QueryDataLoader>
    );
}