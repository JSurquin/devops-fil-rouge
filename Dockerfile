FROM node:24-alpine
WORKDIR /app
COPY app/package.json ./
RUN npm install --omit=dev
COPY app/server.mjs ./
ENV PORT=3000
EXPOSE 3000
USER node
CMD ["node", "server.mjs"]
