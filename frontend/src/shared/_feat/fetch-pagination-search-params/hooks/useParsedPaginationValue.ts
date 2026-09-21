/**
 * @fileoverview React hook for managing a single, schema-validated pagination parameter in the URL.
 */

import {useSearchParams} from "react-router-dom";
import {updateSearchParams} from "@/shared/_feat/fetch-search-params";
import {Logger} from "@/shared/_feat/logger/Logger.ts";
import {PaginationValueSchema} from "@/shared/_feat/fetch-pagination-search-params/schemas/PaginationValueSchema.ts";
import {getPaginationDefaultValue} from "@/shared/_feat/fetch-pagination-search-params/getPaginationDefaultValue.ts";

/** Props for the PaginationValueReturn type. */
type PaginationValueReturn = {
    value: number;
    setValue: (val: number | string) => void;
    hasValue: boolean;
};

/**
 * Custom hook for managing individual pagination segments with Zod validation.
 */
export function useParsedPaginationValue(
    key: "page" | "perPage",
    fallbackValue?: number,
): PaginationValueReturn {
    const [searchParams, setSearchParams] = useSearchParams();

    const searchParamValue = searchParams.get(key);

    const raw = {
        value: searchParamValue ?? fallbackValue ?? getPaginationDefaultValue(key)
    };

    const {data, success, error} = PaginationValueSchema.safeParse(raw);

    if (!success || error) {
        Logger.error({
            type: "ERROR",
            error,
            msg: "Invalid pagination search params.",
            context: {raw},
        });

        throw new Error("Invalid pagination search params.");
    }

    const setValue = (val: number | string) => {
        setSearchParams(
            updateSearchParams({
                searchParams,
                updateData: {[key]: val.toString()},
            }),
        );
    };

    return {
        value: data.value,
        setValue,
        hasValue: searchParamValue !== null,
    };
}

export default useParsedPaginationValue;