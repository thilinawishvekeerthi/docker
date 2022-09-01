FROM node:16.17.0-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

FROM nginx:alpine
COPY --from=0 /app/dist/angular-rxjs /usr/share/nginx/html
COPY nginx.conf.template /etc/nginx/nginx.conf
