import {
    CombinedNavigateParams,
    DeltaNavigateParams,
    LoggingMessageParams,
    ToNavigateParams,
    useLoggedNavigate
} from "@/shared/_feat/navigation/useLoggedNavigate.ts";
import {clearRedirectPath} from "@/shared/_feat/navigation/clearRedirectPath.ts";
import {useCurrentURLPath} from "@/shared/_feat/navigation/useCurrentURLPath.ts";
import {usePaginationLocationState} from "@/shared/_feat/navigation/usePaginationLocationState.ts";
import {setRedirectPath} from "@/shared/_feat/navigation/setRedirectPath.ts";

export {
    useLoggedNavigate,
    clearRedirectPath,
    useCurrentURLPath,
    usePaginationLocationState,
    setRedirectPath,
}

export type {
    LoggingMessageParams,
    ToNavigateParams,
    DeltaNavigateParams,
    CombinedNavigateParams,
}
