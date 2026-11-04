FROM node:20-alpine AS builder
WORKDIR /app

RUN apk add --no-cache libc6-compat python3 make g++

COPY package.json package-lock.json* turbo.json ./
COPY apps/backend/package.json ./apps/backend/

RUN npm ci

COPY apps/backend ./apps/backend

WORKDIR /app/apps/backend
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app/apps/backend
ENV NODE_ENV=production

RUN apk add --no-cache libc6-compat

COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/package.json /app/package.json
COPY --from=builder /app/apps/backend /app/apps/backend

EXPOSE 9000
ENV PORT=9000

CMD ["npx", "medusa", "start", "-p", "9000"]
