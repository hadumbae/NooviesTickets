import {SeatMap, SeatMapDetails, SeatMapSchema} from "@/domains/seatmaps/_schema";
import {ValidationError} from "@noovies-tickets/common";

export function simplifySeatMapDetails(seatMap: SeatMapDetails): SeatMap {
    const {
        seat: {_id: seat},
        showing: {_id: showing},
    } = seatMap;

    const raw = {...seatMap, seat, showing};
    const {data, success, error} = SeatMapSchema.safeParse(raw);

    if (!success) {
        const {errors} = error;
        throw new ValidationError({
            errorCode: "ERR_DATA_VALIDATION",
            message: "Failed to simplify seatF map details.",
            raw,
            errors,
        });
    }

    return data;
}
