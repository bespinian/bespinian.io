FROM node:current as builder
WORKDIR /usr/src/teambespin.io
COPY . ./
RUN npm ci
RUN npm run build

FROM nginxinc/nginx-unprivileged:alpine
COPY --from=builder /usr/src/teambespin.io/docs /usr/share/nginx/html
EXPOSE 8080
ENTRYPOINT ["nginx", "-g", "daemon off;"]
