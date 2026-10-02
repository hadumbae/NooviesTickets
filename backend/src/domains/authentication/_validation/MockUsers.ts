import type {UserSchemaFields} from "@/domains/users/_models/user/User.types";
import {Types} from "mongoose";
import {generateObjectIdPlaceholder} from "@noovies-tickets/common";

type MockUserString = "adminUser" | "clientUser" | "inactiveUser" | "emptyUser" | "invalidUser" | "missingRoleUser"
export const mockUsers: Record<MockUserString, Partial<UserSchemaFields>> = {
    adminUser: {
        _id: Types.ObjectId.createFromHexString(generateObjectIdPlaceholder()),
        name: "John Doe",
        email: "john@doe.com",
        status: "ACTIVE",
        roles: ["USER", "ADMIN"],
        uniqueCode: "USR-K9P2W-LM4X1",
    },
    clientUser: {
        _id: Types.ObjectId.createFromHexString(generateObjectIdPlaceholder()),
        name: "Eric Doe",
        email: "eric@doe.com",
        status: "ACTIVE",
        roles: ["USER"],
        uniqueCode: "USR-K9P2W-LM4X1",
    },
    inactiveUser: {
        _id: Types.ObjectId.createFromHexString(generateObjectIdPlaceholder()),
        name: "Russel Doe",
        email: "russel@doe.com",
        status: "INACTIVE",
        roles: ["USER"],
        uniqueCode: "USR-K9P2W-LM4X1",
    },
    emptyUser: {},
    invalidUser: {
        _id: Types.ObjectId.createFromHexString(generateObjectIdPlaceholder()),
        name: "Bruce Doe",
        email: "bruce@doe.com",
        status: "INACTIVE",
        roles: [],
        uniqueCode: "USR-K9P2W-LM4X1",
    },
    missingRoleUser: {
        _id: Types.ObjectId.createFromHexString(generateObjectIdPlaceholder()),
        name: "Don Doe",
        email: "don@doe.com",
        status: "ACTIVE",
        roles: ["ADMIN"],
        uniqueCode: "USR-K9P2W-LM4X1",
    },
}