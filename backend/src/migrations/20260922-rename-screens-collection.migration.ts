/**
 * @fileoverview Migration script renaming the `screens` MongoDB collection to `theatrescreens`,
 * matching the Mongoose model's registration name change from "Screen" to "TheatreScreen".
 */

import "dotenv/config";
import mongoose from "mongoose";
import {connect} from "@/config/database.js";

connect().then(async () => {
    const db = mongoose.connection.db!;

    await db.collection("screens").rename("theatrescreens");
    console.log("Renamed collection `screens` to `theatrescreens`.");
}).catch((err) => console.error(err)).finally(async () => await mongoose.disconnect());
