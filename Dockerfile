FROM node:20.9.0-alpine
WORKDIR /app
COPY package.json .
RUN yarn
COPY . .
RUN npm run build
CMD ["node", "dist/main.js"]