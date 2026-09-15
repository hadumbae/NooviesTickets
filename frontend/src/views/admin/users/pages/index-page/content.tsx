import {ReactElement, useState} from "react";
import {User} from "@/domains/users/_schema/user/UserSchema.ts";
import {useUserIndexQueryOptionsContext} from "@/domains/users/_ctx/UserIndexQueryOptionsContext.ts";
import {PageFlexWrapper, PageHeader, PaginationRangeButtons} from "@/views/shared/_comp";
import {UserIndexCard} from "@/views/admin/users/_comp/index-card";
import {QueryOptionsFormCollapsible} from "@/views/shared/_feat";
import {UserIndexQueryOptionsForm, UserIndexQueryOptionsFormView} from "@/views/admin/users/_feat";

type ContentProps = {
    users: User[];
    totalUsers: number;
    page: number;
    perPage: number;
    setPage: (page: number) => void;
};

export function UserIndexPageContent(
    {users, totalUsers, page, perPage, setPage}: ContentProps
): ReactElement {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const {values, setValues, activeOptions} = useUserIndexQueryOptionsContext();

    return (
        <PageFlexWrapper>
            <PageHeader
                title="User Management"
                description="Browse, filter, and manage all registered user accounts."
            />

            <UserIndexQueryOptionsForm
                queryOptions={values}
                setQueryOptions={setValues}
                activeOptions={activeOptions}
            >
                <QueryOptionsFormCollapsible isOpen={isOpen} setIsOpen={setIsOpen} disableClear={true}>
                    <UserIndexQueryOptionsFormView/>
                </QueryOptionsFormCollapsible>
            </UserIndexQueryOptionsForm>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {users.map(user => <UserIndexCard key={user._id} user={user}/>)}
            </div>

            <PaginationRangeButtons
                page={page}
                perPage={perPage}
                totalItems={totalUsers}
                setPage={setPage}
            />
        </PageFlexWrapper>
    );
}