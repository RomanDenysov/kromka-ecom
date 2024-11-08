# syntax=docker/dockerfile:1.4
FROM node:18-alpine AS base

WORKDIR /app
RUN corepack enable

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

# Используем секреты во время сборки без сохранения их в слоях образа
RUN --mount=type=secret,id=DATABASE_URL \
    --mount=type=secret,id=PAYLOAD_SECRET \
    --mount=type=secret,id=AUTH_SECRET \
    --mount=type=secret,id=AUTH_GOOGLE_ID \
    --mount=type=secret,id=AUTH_GOOGLE_SECRET \
    --mount=type=secret,id=EMAIL_SERVER \
    --mount=type=secret,id=EMAIL_FROM \
    --mount=type=secret,id=EMAIL_HOST \
    --mount=type=secret,id=EMAIL_PASS \
    --mount=type=secret,id=STRIPE_SECRET_KEY \
    --mount=type=secret,id=NEXT_PUBLIC_SERVER_URL \
    --mount=type=secret,id=NEXT_PUBLIC_STRIPE_PUBLIC_KEY \
    --mount=type=secret,id=NEXT_PUBLIC_MAPS_API_KEY \
    sh -c '\
        export DATABASE_URL=$(cat /run/secrets/DATABASE_URL) && \
        export PAYLOAD_SECRET=$(cat /run/secrets/PAYLOAD_SECRET) && \
        export AUTH_SECRET=$(cat /run/secrets/AUTH_SECRET) && \
        export AUTH_GOOGLE_ID=$(cat /run/secrets/AUTH_GOOGLE_ID) && \
        export AUTH_GOOGLE_SECRET=$(cat /run/secrets/AUTH_GOOGLE_SECRET) && \
        export EMAIL_SERVER=$(cat /run/secrets/EMAIL_SERVER) && \
        export EMAIL_FROM=$(cat /run/secrets/EMAIL_FROM) && \
        export EMAIL_HOST=$(cat /run/secrets/EMAIL_HOST) && \
        export EMAIL_PASS=$(cat /run/secrets/EMAIL_PASS) && \
        export STRIPE_SECRET_KEY=$(cat /run/secrets/STRIPE_SECRET_KEY) && \
        export NEXT_PUBLIC_SERVER_URL=$(cat /run/secrets/NEXT_PUBLIC_SERVER_URL) && \
        export NEXT_PUBLIC_STRIPE_PUBLIC_KEY=$(cat /run/secrets/NEXT_PUBLIC_STRIPE_PUBLIC_KEY) && \
        export NEXT_PUBLIC_MAPS_API_KEY=$(cat /run/secrets/NEXT_PUBLIC_MAPS_API_KEY) && \
        export NODE_ENV=production && \
        pnpm run build \
    '

FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000

COPY --from=base /app/public ./public
COPY --from=base /app/.next ./.next
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/package.json ./package.json

# Создаем пользователя для безопасности
RUN addgroup -g 1001 nodejs && \
    adduser -u 1001 -G nodejs -s /bin/sh -D nextjs && \
    chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
