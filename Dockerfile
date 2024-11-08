# syntax=docker/dockerfile:1.4
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
RUN corepack enable

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Rebuild the source code only when needed
FROM deps AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Объявление аргументов сборки
ARG DATABASE_URL
ARG PAYLOAD_SECRET
ARG AUTH_SECRET
ARG AUTH_GOOGLE_ID
ARG AUTH_GOOGLE_SECRET
ARG EMAIL_SERVER
ARG EMAIL_FROM
ARG EMAIL_HOST
ARG EMAIL_PASS
ARG STRIPE_SECRET_KEY
ARG NEXT_PUBLIC_SERVER_URL
ARG NEXT_PUBLIC_STRIPE_PUBLIC_KEY
ARG NEXT_PUBLIC_MAPS_API_KEY

# Установка переменных окружения
ENV DATABASE_URL=$DATABASE_URL
ENV PAYLOAD_SECRET=$PAYLOAD_SECRET
ENV AUTH_SECRET=$AUTH_SECRET
ENV AUTH_GOOGLE_ID=$AUTH_GOOGLE_ID
ENV AUTH_GOOGLE_SECRET=$AUTH_GOOGLE_SECRET
ENV EMAIL_SERVER=$EMAIL_SERVER
ENV EMAIL_FROM=$EMAIL_FROM
ENV EMAIL_HOST=$EMAIL_HOST
ENV EMAIL_PASS=$EMAIL_PASS
ENV STRIPE_SECRET_KEY=$STRIPE_SECRET_KEY
ENV NEXT_PUBLIC_SERVER_URL=$NEXT_PUBLIC_SERVER_URL
ENV NEXT_PUBLIC_STRIPE_PUBLIC_KEY=$NEXT_PUBLIC_STRIPE_PUBLIC_KEY
ENV NEXT_PUBLIC_MAPS_API_KEY=$NEXT_PUBLIC_MAPS_API_KEY
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

RUN pnpm run build

# Production image
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000

CMD ["node", "server.js"]
