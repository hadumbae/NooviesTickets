/**
 * @fileoverview Registers administrative feature routes for the Express application.
 */

import type {Express} from "express";
import type {RouteRegistration} from "@/server/registerRoutes";
import {PersonAdminImageManagementRoutes} from "@/domains/persons/_feat/update-image";
import {ReservationAdminFetchRoutes} from "@/domains/reservations/_feat/fetch-customer-reservations";
import {PersonCreditRoutes} from "@/domains/movie-credits/_feat/person-credits";
import {UIInputDataRoutes} from "@/domains/ui-inputs";
import {GenreAdminImageManagementRoutes} from "@/domains/genres/_feat/manage-image";
import {MovieAdminImageManagementRoutes} from "@/domains/movies/_feat/manage-image/routes";
import {ReservationAdminUpdateRoutes} from "@/domains/reservations/_feat/update-reservations";
import {MovieReviewAdminModerationRoutes} from "@/domains/movie-reviews/_feat/customer-review-actions";
import {UserAdminRolesRoutes} from "@/domains/users/_feat/manage-user-roles";
import {UserAdminSuspensionRoutes} from "@/domains/users/_feat/manage-user-suspension";
import {UserAdminStatusRoutes} from "@/domains/users/_feat/manage-user-status";

/**
 * Foundation feature routes.
 */
const setupRoutes: RouteRegistration[] = [
    {path: "/api/v1/admin/inputs/feat", router: UIInputDataRoutes},
    {path: "/api/v1/admin/persons/feat", router: PersonAdminImageManagementRoutes},
    {path: "/api/v1/admin/genres/feat/manage-images", router: GenreAdminImageManagementRoutes},
    {path: "/api/v1/admin/movies/feat/manage-images", router: MovieAdminImageManagementRoutes},
];

/**
 * Transactional feature routes for reservations.
 */
const reservationRoutes: RouteRegistration[] = [
    {path: "/api/v1/admin/reservations/feat", router: ReservationAdminUpdateRoutes},
    {path: "/api/v1/admin/reservations/feat", router: ReservationAdminFetchRoutes},
];

/**
 * Aggregation and analytics feature routes for credits.
 */
const creditRoutes: RouteRegistration[] = [
    {path: "/api/v1/admin/movie-credits/feat", router: PersonCreditRoutes},
];

/**
 * Customer relationship and moderation features.
 */
const customerRoutes: RouteRegistration[] = [
    {path: "/api/v1/admin/customers/feat/review-actions", router: MovieReviewAdminModerationRoutes},
];

const userRoutes: RouteRegistration[] = [
    {path: "/api/v1/admin/users/feat/manage-status", router: UserAdminStatusRoutes},
    {path: "/api/v1/admin/users/feat/manage-roles", router: UserAdminRolesRoutes},
    {path: "/api/v1/admin/users/feat/manage-suspension", router: UserAdminSuspensionRoutes},
];

/**
 * Mounts all administrative feature-specific routers into the provided Express application instance.
 */
export function registerAdminModelFeatureRoutes(app: Express): void {
    const routeGroups: RouteRegistration[][] = [
        setupRoutes,
        reservationRoutes,
        customerRoutes,
        creditRoutes,
        userRoutes,
    ];

    for (const routes of routeGroups) {
        for (const {path, router} of routes) {
            app.use(path, router);
        }
    }
}