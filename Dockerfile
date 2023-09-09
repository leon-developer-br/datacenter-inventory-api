FROM node:20.6.0-alpine
COPY package.json .
COPY node_modules .
COPY dist .