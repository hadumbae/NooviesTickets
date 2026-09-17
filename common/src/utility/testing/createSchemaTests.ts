/**
 * @fileoverview Test utility suite for defining and executing Vitest assertions against Zod schemas.
 */

import {input, output, SafeParseReturnType, ZodTypeAny} from "zod";
import {describe, expect, it} from "vitest";

/** Callback function for performing custom assertions on schema safe-parse results. */
export type SchemaTestTaskCallback<TType extends ZodTypeAny> = (results: SafeParseReturnType<input<TType>, output<TType>>) => void;

/** Test case specification containing test values, expected success status, and optional assertion callback. */
export type SchemaTestTask<TType extends ZodTypeAny> = {
    description: string;
    values: unknown[];
    success: boolean;
    callback?: SchemaTestTaskCallback<TType>;
}

/** Grouping of related schema test tasks within a descriptive test suite. */
export type SchemaTestSuite<TType extends ZodTypeAny> = {
    description: string;
    tasks: SchemaTestTask<TType>[];
}

type FactoryConfig<TType extends ZodTypeAny> = {
    name: string;
    schema: TType;
    suites: SchemaTestSuite<TType>[];
}

/**
 * Generates and runs Vitest describe and it blocks for testing Zod schema validation rules.
 */
export function createSchemaTests<TType extends ZodTypeAny>(
    { name, schema, suites }: FactoryConfig<TType>
) {
    describe(name, () => {
        for (const {description: suiteDesc, tasks} of suites) {
            describe(suiteDesc, () => {
                for (const {description: taskDesc, values: taskValues, success: taskSuccess, callback} of tasks) {
                    // Each value is wrapped in its own single-element array so vitest's it.each treats it as
                    // one argument, even when the value is itself an array (e.g. a coordinate tuple) — otherwise
                    // it.each spreads an array value into multiple callback arguments instead of passing it whole.
                    it.each(taskValues.map((value) => [value]))(taskDesc, (value) => {
                        const results = schema.safeParse(value);
                        const { success } = results;

                        expect(success).toBe(taskSuccess);
                        callback?.(results);
                    });
                }
            });
        }
    });
}