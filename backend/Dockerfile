FROM node:20-alpine
WORKDIR /app

COPY package.json package-lock.json ./
COPY frontend/package.json ./frontend/
COPY backend/package.json ./backend/
COPY common/package.json ./common/
COPY mobile/package.json ./mobile/
RUN npm ci --workspace=backend --include-workspace-root

COPY common ./common
COPY backend ./backend

WORKDIR /app/backend

USER node

EXPOSE 8080
CMD ["node", "--import=tsx", "./src/app.ts"]
