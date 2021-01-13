FROM node:14.15.3-alpine3.10 AS builder
COPY . /src/app
WORKDIR /src/app
RUN yarn build

FROM nginxinc/nginx-unprivileged:stable
COPY --from=builder /src/app/dist /usr/share/nginx/html/

