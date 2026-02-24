FROM node:18
WORKDIR /app

COPY backend/package*.json ./backend/
RUN cd backend && npm install
COPY backend/ ./backend/

COPY --from=client-build /app/frontend/dist ./frontend/dist

WORKDIR /app/backend
EXPOSE 5000
CMD ["npm", "run", "dev"]