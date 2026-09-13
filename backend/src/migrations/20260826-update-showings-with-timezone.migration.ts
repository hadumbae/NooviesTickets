/**
 * @fileoverview Migration script for populating showing timezones from their parent theatre locations.
 */

import "dotenv/config";
import mongoose from "mongoose";
import {connect} from "@/shared/config/database.js";
import {ShowingModel} from "@/domains/showing";
import {TheatreModel} from "@/domains/theatre/model/theatre";

connect().then(async () => {

    const cursor = ShowingModel.find().cursor();

    for (let showing = await cursor.next(); showing !== null; showing = await cursor.next()) {
        const theatre = await TheatreModel.findById(showing.theatre);
        if (!theatre) continue;

        showing.timezone = theatre.location.timezone;
        await showing.save();

        console.log(`Updated Showing Timezone: ${showing._id}`);
        console.log(`New Timezone: ${showing.timezone} • ${theatre.location.timezone}`);
    }
}).catch((err) => console.error(err)).finally(async () => await mongoose.disconnect());