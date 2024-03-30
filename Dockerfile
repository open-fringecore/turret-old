FROM node:20-alpine

RUN npm install -g pnpm

RUN apk update
RUN apk add docker-cli
