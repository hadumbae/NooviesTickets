/**
 * @fileoverview Defines virtual fields for the SeatMap schema to handle pricing and seat property delegation.
 */

import {SeatMapSchema} from "@/domains/seatmaps/_models/seat-map/SeatMap.schema.js";
import mongooseLeanVirtuals from "mongoose-lean-virtuals";
import type {TheatreSeatSchemaFields} from "@/domains/theatre-seats/_models";

SeatMapSchema.virtual("finalPrice").get(function () {
    if (this.overridePrice) {
        return this.overridePrice;
    }

    return this.basePrice * this.priceMultiplier;
});

SeatMapSchema.virtual("x").get(function () {
    if (this.seat && typeof this.seat === "object") {
        return (this.seat as TheatreSeatSchemaFields).x;
    }

    return undefined;
});

SeatMapSchema.virtual("y").get(function () {
    if (this.seat && typeof this.seat === "object") {
        return (this.seat as TheatreSeatSchemaFields).y;
    }

    return undefined;
});

SeatMapSchema.virtual("row").get(function () {
    if (this.seat && typeof this.seat === "object") {
        return (this.seat as TheatreSeatSchemaFields).row;
    }

    return undefined;
});

SeatMapSchema.virtual("seatLabel").get(function () {
    if (this.seat && typeof this.seat === "object") {
        return (this.seat as TheatreSeatSchemaFields).seatLabel ?? undefined;
    }

    return undefined;
});

SeatMapSchema.plugin(mongooseLeanVirtuals);
