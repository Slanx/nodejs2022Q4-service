FROM node:alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci && npm cache clean --force
COPY . .
CMD npm run migration:run && npm run start:dev