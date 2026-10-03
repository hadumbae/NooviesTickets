/**
 * @fileoverview Migration script renaming the `seats` MongoDB collection to `theatreseats`,
 * matching the Mongoose model's registration name change from "Seat" to "TheatreSeat".
 */

import "dotenv/config";
import mongoose from "mongoose";
import {connect} from "@/config/database.js";

connect().then(async () => {
    const db = mongoose.connection.db!;

    await db.collection("seats").rename("theatreseats");
    console.log("Renamed collection `seats` to `theatreseats`.");
}).catch((err) => console.error(err)).finally(async () => await mongoose.disconnect());
