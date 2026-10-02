/**
 * @fileoverview Zod discriminated union error parameter handler.
 */

import {z} from "zod";

type HandlerConfig = {
    discriminator: string;
    invalidValue?: string;
}

/**
 * Creates a Zod parameter configuration for a discriminated union that reports a missing
 * discriminator value as "Required" instead of Zod's default "invalid discriminator" message.
 */
export function ZodDiscriminatedUnionParamHandler(
    {discriminator, invalidValue}: HandlerConfig,
): z.RawCreateParams {
    return (
        {
            errorMap: (issue, ctx) => {
                if (issue.code === z.ZodIssueCode.invalid_union_discriminator) {
                    const data = ctx.data as Record<string, unknown> | undefined;

                    if (data?.[discriminator] === undefined) {
                        return {message: "Required"};
                    }

                    return {message: invalidValue ?? ctx.defaultError};
                }

                return {message: ctx.defaultError};
            },
        }
    )
}
