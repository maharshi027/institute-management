FROM node:18

WORKDIR /app

COPY server/package*.json ./server/
RUN cd server && npm install

COPY server ./server

COPY --from=client-build /app/client/dist ./client/dist

WORKDIR /app/server

EXPOSE 5000

CMD ["npm", "run", "dev"]