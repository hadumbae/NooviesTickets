import {ShowingModel} from "@/domains/showing/_models/showing/Showing.model.js";
import {ObjectIdStringSchema} from "../mongoose/ObjectIdStringSchema.js";
import {GenreModel} from "@/domains/genres/_models/genre";
import {PersonModel} from "@/domains/persons/_models/person";
import {ScreenModel} from "@/domains/screen/_models/screen";
import {TheatreModel} from "@/domains/theatre/model/theatre";
import {SeatModel} from "@/domains/seat/_models";

export const GenreAsyncIDString = ObjectIdStringSchema
    .refine(
        async (genreID) => {
            const genre = await GenreModel.findById(genreID);
            return !!genre;
        },
        "404. Invalid ID."
    );

export const PersonAsyncIDString = ObjectIdStringSchema
    .refine(
        async (personID) => {
            const genre = await PersonModel.findById(personID);
            return !!genre;
        },
        "404. Invalid ID."
    );

export const TheatreAsyncIDString = ObjectIdStringSchema
    .refine(
        async (theatreID) => {
            const theatre = await TheatreModel.findById(theatreID);
            return !!theatre;
        },
        "404. Screen not found."
    );

export const SeatAsyncIDString = ObjectIdStringSchema
    .refine(
        async (seatID) => {
            const seat = await SeatModel.findById(seatID);
            return !!seat;
        },
        "404. Screen not found."
    );

export const ScreenAsyncIDString = ObjectIdStringSchema
    .refine(
        async (screenID) => {
            const screen = await ScreenModel.findById(screenID);
            return !!screen;
        },
        "404. Screen not found."
    );

export const ShowingAsyncIDString = ObjectIdStringSchema
    .refine(
        async (showingID) => {
            const showing = await ShowingModel.findById(showingID);
            return !!showing;
        },
        "404. Showing not found."
    );