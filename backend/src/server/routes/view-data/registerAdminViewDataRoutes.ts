/**
 * @fileoverview Registers Express route groups for administrative view data endpoints.
 */

import type {Express} from "express";
import type {RouteRegistration} from "../../registerRoutes";
import {GenreAdminViewDataRoutes} from "@/domains/genres/_feat/admin-view-data";
import {PersonAdminViewDataRoutes} from "@/domains/persons/_feat/admin-view-data";
import {TheatreAdminViewDataRoutes} from "@/domains/theatres/_feat/admin-view-data";
import {TheatreScreenAdminViewDataRoutes} from "@/domains/theatre-screens/_feat/view-data-admin";
import {ShowingAdminViewDataRoutes} from "@/domains/showings/_feat/admin-view-data";
import {UserAdminViewDataRoutes} from "@/domains/users/_feat/admin-view-data";
import {CustomerAdminViewDataRoutes} from "@/domains/customer/_feat/customer-details";
import {DashboardAdminRoutes} from "@/domains/dashboard";
import {MovieAdminViewDataRoutes} from "@/domains/movies";

const pageRouteGroups: RouteRegistration[] = [
    {
        path: "/api/v1/views/desktop/admin/dashboard",
        router: DashboardAdminRoutes,
    },
];

const userRouteGroups: RouteRegistration[] = [
    {
        path: "/api/v1/views/desktop/admin/users",
        router: UserAdminViewDataRoutes,
    },
    {
        path: "/api/v1/views/desktop/admin/customers",
        router: CustomerAdminViewDataRoutes,
    },
];

const setupRouteGroups: RouteRegistration[] = [
    {
        path: "/api/v1/views/desktop/admin/genres",
        router: GenreAdminViewDataRoutes
    },
    {
        path: "/api/v1/views/desktop/admin/persons",
        router: PersonAdminViewDataRoutes,
    },
    {
        path: "/api/v1/views/desktop/admin/theatres",
        router: TheatreAdminViewDataRoutes,
    },
    {
        path: "/api/v1/views/desktop/admin/theatre-screens",
        router: TheatreScreenAdminViewDataRoutes,
    },
];

const movieRouteGroups: RouteRegistration[] = [
    {
        path: "/api/v1/views/desktop/admin/movies",
        router: MovieAdminViewDataRoutes,
    },
];

const showingRouteGroups: RouteRegistration[] = [
    {
        path: "/api/v1/views/desktop/admin/showings",
        router: ShowingAdminViewDataRoutes
    },
];

/** Registers all admin-facing view data route groups to the Express application. */
export function registerAdminViewDataRoutes(app: Express) {
    const routeGroups: RouteRegistration[][] = [
        pageRouteGroups,
        userRouteGroups,
        setupRouteGroups,
        movieRouteGroups,
        showingRouteGroups,
    ];

    for (const routeGroup of routeGroups) {
        for (const {path, router} of routeGroup) {
            app.use(path, router);
        }
    }
}