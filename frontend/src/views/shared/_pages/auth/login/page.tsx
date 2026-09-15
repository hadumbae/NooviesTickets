/**
 * @file Authentication login page component.
 * @filename AuthLoginPage.tsx
 */

import Cookies from "js-cookie";
import {DateTime} from "luxon";
import {ReactElement, useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {clearRedirectPath} from "@/shared/_feat/navigation/clearRedirectPath.ts";
import {PageCenter} from "@/views/shared/_comp/page";
import {AuthLoginPageHeader} from "@/views/shared/_pages/auth/login/header.tsx";
import {AuthLoginFormView} from "@/views/shared/_feat/auth-login-form/AuthLoginFormView.tsx";
import {SROnly} from "@/views/shared/_comp/screen-readers";
import {User} from "@/domains/users/_schema/user/UserSchema.ts";
import {setAuthExpireBy} from "@/domains/authentication/_feat/storage";
import {useSetAuthUser} from "@/domains/authentication/_feat/manage-auth-user-data";
import {AuthLoginForm} from "@/views/shared/_feat/auth-login-form/AuthLoginForm.tsx";

/**
 * Renders the primary login interface and manages post-authentication redirection logic.
 */
export function AuthLoginPage(): ReactElement {
    const navigate = useNavigate();
    const location = useLocation();
    const setAuthUser = useSetAuthUser();

    useEffect(() => {
        if (location.state?.showLoginError) {
            toast.error(
                location.state?.loginErrorMessage ??
                "An error occurred. Please log in."
            );
        }
    }, [location.state?.showLoginError, location.state?.loginErrorMessage]);

    const onSubmitSuccess = (user: User) => {
        const refreshByDate = Cookies.get("refreshBy");
        const refreshDate = refreshByDate ? DateTime.fromISO(refreshByDate) : DateTime.now();

        setAuthUser(user);
        setAuthExpireBy(refreshDate);

        const path = clearRedirectPath() ?? "/";
        navigate(path);
    };

    return (
        <PageCenter className="space-y-10">
            <AuthLoginPageHeader/>

            <section className="w-full md:w-2/3 2xl:w-1/3">
                <SROnly text="Login Form"/>

                <AuthLoginForm onSubmitSuccess={onSubmitSuccess} successMessage="Logged in!">
                    <AuthLoginFormView/>
                </AuthLoginForm>
            </section>
        </PageCenter>
    );
}
