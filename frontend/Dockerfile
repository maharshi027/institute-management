FROM node:18 AS client-build
WORKDIR /app/frontend
COPY frontend/package*.json ./

RUN npm install

COPY frontend/ ./
RUN npm run build
