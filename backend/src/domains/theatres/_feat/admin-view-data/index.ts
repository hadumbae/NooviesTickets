import {
    fetchTheatreDetailsViewData,
    fetchTheatreShowingListViewData
} from "@/domains/theatres/_feat/admin-view-data/service/service";
import type {
    FetchTheatreDetailsViewDataConfig,
    FetchTheatreShowingListViewDataConfig, TheatreDetailsViewData,
    TheatreShowingListViewData
} from "@/domains/theatres/_feat/admin-view-data/service/service.types";
import {
    getFetchTheatreDetailsViewData,
    getFetchTheatreShowingListViewData
} from "@/domains/theatres/_feat/admin-view-data/controller";
import {TheatreAdminViewDataRoutes} from "@/domains/theatres/_feat/admin-view-data/routes";
import {
    type TheatreDetailsViewRouteConfig,
    TheatreDetailsViewRouteConfigSchema
} from "@/domains/theatres/_feat/admin-view-data/schemas/TheatreDetailsViewRouteConfigSchema";
import {
    type TheatreShowingListRouteConfig,
    TheatreShowingListRouteConfigSchema
} from "@/domains/theatres/_feat/admin-view-data/schemas/TheatreShowingListRouteConfigSchema";

export {
    TheatreAdminViewDataRoutes,
    TheatreDetailsViewRouteConfigSchema,
    fetchTheatreDetailsViewData,
    getFetchTheatreDetailsViewData,
    TheatreShowingListRouteConfigSchema,
    fetchTheatreShowingListViewData,
    getFetchTheatreShowingListViewData,
}

export type {
    TheatreDetailsViewRouteConfig,
    FetchTheatreDetailsViewDataConfig,
    TheatreDetailsViewData,
    TheatreShowingListRouteConfig,
    FetchTheatreShowingListViewDataConfig,
    TheatreShowingListViewData,
}

