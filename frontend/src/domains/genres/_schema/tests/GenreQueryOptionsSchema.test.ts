import {describe, it, expect} from "vitest";
import {GenreQueryOptionsSchema} from "@/domains/genres/_schema/filters/GenreQueryOptionsSchema.ts";

describe("GenreQueryOptionsSchema", () => {
    describe("Valid query options for schema", () => {
        it("accepts empty data", () => {
            const {success, data} = GenreQueryOptionsSchema.safeParse({});

            expect(success).toBe(true);
            expect(data).toEqual({});
        });

        it("accepts empty strings as data", () => {
            const {success, data} = GenreQueryOptionsSchema.safeParse({
                name: "",
                sortByName: "",
            });

            expect(success).toBe(true);
            expect(data).toEqual({name: undefined, sortByName: undefined});
        });

        it("accepts valid data", () => {
            const {success, data} = GenreQueryOptionsSchema.safeParse({
                name: "Drama",
                sortByName: "-1",
            });

            expect(success).toBe(true);
            expect(data).toEqual({name: "Drama", sortByName: -1});
        });

        it("accepts null as data", () => {
            const {success, data} = GenreQueryOptionsSchema.safeParse({
                name: null,
                sortByName: null,
            });

            expect(success).toBe(true);
            expect(data).toEqual({name: undefined, sortByName: undefined});
        });
    });

    describe("Invalid query options for schema", () => {
        it("rejects an overly long name as data", () => {
            const {success, error} = GenreQueryOptionsSchema.safeParse({
                name: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur.",
                sortByName: -1,
            });

            expect(success).toBe(false);
            expect(error?.errors[0].path[0]).toBe("name");
            expect(error?.errors[0].code).toBe("too_big");
        });
    });
})