/**
 * @fileoverview Registers administrative feature routes for movie showings and related domain actions.
 */

import type {Express} from "express";
import type {RouteRegistration} from "../../registerRoutes";
import {ShowingActionRoutes} from "@/domains/showings/_feat/showing-actions/routes";

/**
 * Registers administrative feature routes with the Express application instance.
 */
export function registerAdminFeaturesRoutes(app: Express) {
    const routes: RouteRegistration[] = [
        {path: "/api/v1/feat/showing-actions", router: ShowingActionRoutes},
    ];

    for (const {path, router} of routes) {
        app.use(path, router);
    }
}