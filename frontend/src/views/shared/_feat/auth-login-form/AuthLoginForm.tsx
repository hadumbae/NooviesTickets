/**
 * @fileoverview Form provider and hooks for handling user login form state and submission.
 */

import {createForm} from "@/shared/_feat";
import {User} from "@/domains/users/_schema/user/UserSchema.ts";
import {useAuthLoginUser} from "@/domains/authentication/_feat/user-login/useAuthLoginUser.ts";
import {
    AuthLoginFormData,
    AuthLoginFormSchema,
    AuthLoginFormValues
} from "@/domains/authentication/_feat/user-login/AuthLoginFormSchema";

const {SubmitForm} = createForm<
    AuthLoginFormValues,
    AuthLoginFormData,
    unknown,
    User
>({
    formName: "auth-login-form",
    schema: AuthLoginFormSchema,
    mutation: useAuthLoginUser,
    defaultValues: {
        email: "",
        password: "",
    },
});

export {
    /** Form component provider for authentication login. */
        SubmitForm as AuthLoginForm,
}