# syntax=docker/dockerfile:1.7

# Stage 1: installation des dependances
FROM node:24-alpine AS deps
WORKDIR /app
RUN apk add --no-cache libc6-compat
COPY package.json package-lock.json ./
RUN npm ci

# Stage 2: build de l'application Next.js
FROM node:24-alpine AS builder
WORKDIR /app
RUN apk add --no-cache libc6-compat
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

# Valeurs factices utilisées uniquement pendant le build.
# Les vrais secrets doivent être fournis au démarrage du conteneur.
ENV DATABASE_URL_POSTGRES="postgresql://build:build@127.0.0.1:5432/build_placeholder"
ARG NEXT_PUBLIC_BASE_URL=http://localhost:3000
ENV NEXT_PUBLIC_BASE_URL=${NEXT_PUBLIC_BASE_URL}
ENV GOOGLE_CLIENT_ID="build-placeholder"
ENV GOOGLE_CLIENT_SECRET="build-placeholder"
ENV BETTER_AUTH_SECRET="build-only-placeholder-secret-please-replace-at-runtime"
ENV BETTER_AUTH_URL="http://localhost:3000"

RUN npm run build

# Stage 3: minimal production runtime
FROM node:24-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000

CMD ["node", "server.js"]
