/**
 * @fileoverview Breadcrumb navigation component for the create movie showing admin page.
 */

import {ReactElement} from "react";
import {HoverLink} from "@/views/shared/_feat/navigation/HoverLink.tsx";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/views/shared/_comp/ui";

/** Props for the CreateMovieShowingPageBreadcrumbs component. */
type BreadcrumbProps = {
    slug: string;
    title: string;
}

/**
 * Breadcrumb navigation for the create movie showing page providing links back to the movie list and movie profile.
 */
export function CreateMovieShowingPageBreadcrumbs(
    { slug, title }: BreadcrumbProps,
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
                    <BreadcrumbLink asChild>
                        <HoverLink to={`/admin/movies/${slug}`}>
                            {title}
                        </HoverLink>
                    </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator/>

                <BreadcrumbItem>
                    <BreadcrumbPage>Create Showing</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
}