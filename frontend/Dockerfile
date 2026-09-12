# ---- STATIC ASSETS ----

FROM node:20-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
COPY frontend/package.json ./frontend/
COPY backend/package.json ./backend/
COPY common/package.json ./common/
COPY mobile/package.json ./mobile/
RUN npm ci --workspace=frontend --include-workspace-root

ARG VITE_API_URL
ARG VITE_DEV_MODE=false
ARG VITE_DEV_LOG_TO_CONSOLE=false
ARG VITE_DEV_CLIENT_NAME=web
ARG VITE_IPIFY_KEY
ARG VITE_PAGINATION_PAGE_DEFAULT=1
ARG VITE_PAGINATION_PER_PAGE_DEFAULT=10
ARG VITE_LOG_FETCH_RESULT_TO_CONSOLE=false

ENV VITE_API_URL=$VITE_API_URL \
    VITE_DEV_MODE=$VITE_DEV_MODE \
    VITE_DEV_LOG_TO_CONSOLE=$VITE_DEV_LOG_TO_CONSOLE \
    VITE_DEV_CLIENT_NAME=$VITE_DEV_CLIENT_NAME \
    VITE_IPIFY_KEY=$VITE_IPIFY_KEY \
    VITE_PAGINATION_PAGE_DEFAULT=$VITE_PAGINATION_PAGE_DEFAULT \
    VITE_PAGINATION_PER_PAGE_DEFAULT=$VITE_PAGINATION_PER_PAGE_DEFAULT \
    VITE_LOG_FETCH_RESULT_TO_CONSOLE=$VITE_LOG_FETCH_RESULT_TO_CONSOLE

COPY common ./common
COPY frontend ./frontend
RUN npm run build --workspace=frontend

# ---- SERVE ----

FROM nginx:1.27-alpine AS runtime

COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/frontend/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
