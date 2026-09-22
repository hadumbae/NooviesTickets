/**
 * @fileoverview Centralized registration of all application routes for the Express server.
 */

import type {Express, Router} from "express";
import {registerAuthRoutes} from "@/server/routes/registerAuthRoutes";
import {registerDataRoutes} from "@/server/routes/registerDataRoutes";
import {registerExternalRoutes} from "@/server/routes/registerExternalRoutes";
import {registerAdminCRUDRoutes} from "@/server/routes/crud-routes";
import {registerAdminViewDataRoutes, registerClientViewDataRoutes,} from "@/server/routes/view-data";
import {registerAdminModelFeatureRoutes, registerClientModelFeatureRoutes} from "@/server/routes/model-feature-routes";
import {registerAdminFeaturesRoutes, registerClientFeaturesRoutes} from "@/server/routes/feature-routes";


/** Represents a route path and its associated Express router. */
export type RouteRegistration = {
    path: string;
    router: Router;
};

/** Orchestrates the registration of all application route modules onto the Express instance. */
export function registerRoutes(app: Express) {
    registerAuthRoutes(app);
    registerDataRoutes(app);
    registerExternalRoutes(app);

    registerAdminFeaturesRoutes(app);
    registerClientFeaturesRoutes(app);

    registerAdminCRUDRoutes(app);

    registerAdminModelFeatureRoutes(app);
    registerClientModelFeatureRoutes(app);

    registerAdminViewDataRoutes(app);
    registerClientViewDataRoutes(app);

}