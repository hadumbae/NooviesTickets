/**
 * @fileoverview Card component for displaying a summary of movie showing details.
 */

import {ReactElement} from "react";
import {MovieShowingSummary} from "@/domains/showings/_schema/showing/MovieShowingSummarySchema.ts";
import {Button, Card, CardContent, Separator} from "@/views/shared/_comp/ui";
import {Link} from "react-router-dom";
import {Armchair, Cog, DollarSign, Search, Star} from "lucide-react";
import {IconBadge} from "@/views/shared/_comp/badges/IconBadge.tsx";
import {ShowingStatusLabels} from "@noovies-tickets/common";

/** Props for the MovieShowingSummaryCard component. */
type CardProps = {
    showing: MovieShowingSummary
};

/**
 * Card displaying movie showing details including theatre information, schedule, pricing, status badges, and configuration flags.
 */
export function MovieShowingSummaryCard(
    {showing}: CardProps
): ReactElement {
    const {slug, theatreSnapshot, startTime, endTime, ticketPrice, status, config} = showing;
    const {name, city, country} = theatreSnapshot;
    const {canReserveSeats, isSpecialEvent} = config;

    const startFormatted = startTime.toFormat("LLL dd, yyyy (hh:mm)");
    const endFormatted = startTime.hasSame(endTime, "day")
        ? endTime.toFormat("hh:mm")
        : endTime.toFormat("LLL dd, yyyy (hh:mm)");

    return (
        <Card>
            <CardContent className="p-3 space-y-3">
                <div className="flex justify-between items-center">
                    <div>
                        <h3 className="subsection-title">{name}</h3>
                        <h4 className="subsection-subtitle">{city}, {country}</h4>
                    </div>

                    <Link to={`/admin/showings/get/${slug}`}>
                        <Button size="icon" variant="outline">
                            <Search/>
                        </Button>
                    </Link>
                </div>

                <Separator/>

                <div>
                    <p className="primary-text text-sm font-medium">{startFormatted}</p>
                    <p className="secondary-text text-sm">Ends {endFormatted}</p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                    <IconBadge
                        icon={DollarSign}
                        variant="default"
                        text={ticketPrice.toString()}
                    />

                    <IconBadge
                        icon={Cog}
                        variant={status === "CANCELLED" ? "danger" : "default"}
                        text={ShowingStatusLabels[status]}
                    />

                    <IconBadge
                        icon={Star}
                        variant={isSpecialEvent ? "warning" : "default"}
                        text={isSpecialEvent ? "Special Event" : "Normal Event"}
                    />

                    <IconBadge
                        icon={Armchair}
                        variant={canReserveSeats ? "success" : "danger"}
                        text={canReserveSeats ? "Bookable" : "Non Bookable"}
                    />
                </div>
            </CardContent>
        </Card>
    );
}