/**
 * @fileoverview Page component for user registration.
 */

import {ReactElement} from 'react';
import {PageCenter} from "@/views/shared/_comp/page";
import {AuthRegisterForm} from "@/views/shared/_feat/auth-register-form/AuthRegisterForm.tsx";
import {AuthRegisterPageHeader} from "@/views/shared/_pages/auth/register/header.tsx";
import {useLoggedNavigate} from "@/shared/_feat/navigation/useLoggedNavigate.ts";
import {AuthRegisterFormView} from "@/views/shared/_feat/auth-register-form";
import {SROnly} from "@/views/shared/_comp/screen-readers";

/**
 * Renders the registration page containing the AuthRegisterForm within a styled card.
 */
export function AuthRegisterPage(): ReactElement {
    const navigate = useLoggedNavigate();

    const onRegister = () => {
        navigate({
            to: "/auth/login",
            component: AuthRegisterPage.name,
            message: "Navigate to login page after registering.",
        });
    };

    return (
        <PageCenter className="space-y-10">
            <AuthRegisterPageHeader/>

            <section className="w-full md:w-2/3 2xl:w-1/3">
                <SROnly text="Register Form"/>

                <AuthRegisterForm onSubmitConfig={{onSubmitSuccess: onRegister}}>
                    <AuthRegisterFormView/>
                </AuthRegisterForm>
            </section>
        </PageCenter>
    );
}
