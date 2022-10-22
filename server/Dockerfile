FROM node:16.18.0
WORKDIR /app
COPY . .

RUN npm install

RUN npm run build

CMD ["/app/build/app.js"]
