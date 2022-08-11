FROM docker.io/library/node:current AS builder
WORKDIR /usr/src/app
COPY . .
RUN npm ci
RUN npm run build

FROM docker.io/nginxinc/nginx-unprivileged:1-alpine
COPY --from=builder --chown=nginx:nginx /usr/src/app/build /usr/share/nginx/html/
