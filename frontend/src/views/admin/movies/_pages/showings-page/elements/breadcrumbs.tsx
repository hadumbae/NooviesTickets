/**
 * @fileoverview Breadcrumb navigation component for the movie showings admin page.
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

/** Props for the MovieShowingsPageBreadcrumbs component. */
type BreadcrumbProps = {
    slug: string;
    title: string;
}

/**
 * Breadcrumb navigation for the movie showings page providing links back to the movie list and movie profile.
 */
export function MovieShowingsPageBreadcrumbs(
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
                        <HoverLink to={`/admin/movies/get/${slug}`}>
                            {title}
                        </HoverLink>
                    </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator/>

                <BreadcrumbItem>
                    <BreadcrumbPage>Showings</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
}