FROM node:current as builder
WORKDIR /usr/src/app
COPY . ./
RUN npm ci
RUN npm run build

FROM nginxinc/nginx-unprivileged:alpine
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html
EXPOSE 8080
ENTRYPOINT ["nginx", "-g", "daemon off;"]
