FROM node:latest as build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM nginx:latest
RUN mkdir -p /var/www/tictactoe
COPY nginx /etc/nginx/conf.d
COPY --from=build /app/build/ /var/www/tictactoe
