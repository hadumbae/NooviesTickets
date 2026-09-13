/**
 * @file 20260218-add-favourites-to-users.migration.ts
 * Migration script to backfill missing user favourites arrays.
 */

import "dotenv/config";
import {connect} from "@/shared/config/database.js";
import {UserModel} from "@/domains/users/model/user/User.model";
import mongoose from "mongoose";

/**
 * Ensures all users have a defined `favourites` array.
 */
connect().then(async () => {
    const cursor = UserModel.find().cursor();

    for (
        let user = await cursor.next();
        user !== null;
        user = await cursor.next()
    ) {
        if (!user.favourites) {
            user.favourites = [];
            await user.save();
        }
    }
}).catch((err) => {
    console.error(err)
}).finally(async () => {
    await mongoose.disconnect();
});
