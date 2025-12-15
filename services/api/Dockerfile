# ---------- BUILD ----------
FROM node:18-alpine AS builder

WORKDIR /app

RUN apk add --no-cache bash

COPY package*.json ./
RUN npm install

COPY . .
RUN rm -f .env

RUN npm run build


# ---------- RUNTIME ----------
FROM node:18-alpine

RUN addgroup -S app && adduser -S app -G app
USER app

WORKDIR /app

# Código compilado
COPY --from=builder /app/dist ./dist

# IMPORTANTE: assets estáticos e views
COPY --from=builder /app/src/views ./dist/views
COPY --from=builder /app/src/public ./dist/public

COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

CMD ["node", "dist/index.js"]
