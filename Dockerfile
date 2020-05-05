FROM node:current AS builder
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build

FROM nginxinc/nginx-unprivileged:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
