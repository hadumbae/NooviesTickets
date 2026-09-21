/**
 * @fileoverview Breadcrumb navigation for the Movie Details administrative profile page.
 */


import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/views/shared/_comp/ui";
import {HoverLink} from "@/views/shared/_feat/navigation/HoverLink.tsx";
import {ReactElement} from "react";

type BreadcrumbProps = {
    title: string;
}

/**
 * Renders the breadcrumb trail for navigating back to the movie management index.
 */
export function MovieDetailsBreadcrumb(
    { title }: BreadcrumbProps
): ReactElement {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <HoverLink to="/admin/movies">
                            All Movies
                        </HoverLink>
                    </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator/>

                <BreadcrumbItem>
                    <BreadcrumbPage>{title}</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
}