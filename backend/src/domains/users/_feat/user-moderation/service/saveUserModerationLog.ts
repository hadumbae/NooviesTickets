/**
 * @fileoverview Service function handling the database persistence of general user moderation log entries.
 */

import {Types} from "mongoose";
import type {ModerationLogMessage, UserModerationLogAction} from "@noovies-tickets/common";
import {UserModerationLogModel, type UserModerationLogSchemaFields} from "@/domains/users/_models";

/** Configuration parameters required to persist a user moderation log. */
type SaveConfig<TAction extends string = UserModerationLogAction> = {
    admin: Types.ObjectId;
    user: Types.ObjectId;
    action: TAction;
    message: ModerationLogMessage;
};

/**
 * Creates and records a new user moderation log entry in the database.
 */
export async function saveUserModerationLog<TAction extends string = UserModerationLogAction>(
    {admin, user, action, message}: SaveConfig<TAction>
): Promise<UserModerationLogSchemaFields> {
    const log = new UserModerationLogModel({
        admin,
        user,
        modDate: new Date(),
        action,
        message,
    });

    await log.save();

    return log;
}