/**
 * @fileoverview Content layout for the person information page.
 */

import {ReactElement, useEffect} from "react";
import {PageFlexWrapper} from "@/views/shared/_comp";
import {Person} from "@noovies-tickets/common";
import {organisePersonFilmography, PersonCreditRoleGroup} from "@/domains/movie-credits";
import {
    PersonInfoCastSection
} from "@/views/client/persons/_pages/info-page/sections/PersonInfoCastSection.tsx";
import {
    PersonInfoCrewSection
} from "@/views/client/persons/_pages/info-page/sections/PersonInfoCrewSection.tsx";
import {
    PersonInfoDetailsCard
} from "@/views/client/persons/_comp/info-details/PersonInfoDetailsCard.tsx";
import {
    PersonInfoPageBreadcrumbs
} from "@/views/client/persons/_pages/info-page/sections/breadcrumbs.tsx";

/** Props for the PersonInfoContent component. */
type ContentProps = {
    person: Person;
    filmography: PersonCreditRoleGroup[];
    setTitle: (title: string) => void;
};

/**
 * Renders the detailed information, cast credits, and crew credits for a specific person.
 */
export function PersonInfoContent(
    {person, filmography, setTitle}: ContentProps
): ReactElement {
    useEffect(() => {
        setTitle(person.name);
    }, [person, setTitle]);

    const {cast, crew} = organisePersonFilmography({filmography});

    return (
        <PageFlexWrapper>
            <PersonInfoPageBreadcrumbs name={person.name} />
            <PersonInfoDetailsCard person={person} classNames={{card: "md:col-span-2"}}/>

            {cast.length > 0 && <PersonInfoCastSection credits={cast}/>}
            {crew.length > 0 && <PersonInfoCrewSection credits={crew}/>}
        </PageFlexWrapper>
    );
}