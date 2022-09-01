FROM node:16.17.0-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

FROM nginx:alpine
COPY --from=0 /app/dist/angular-rxjs /usr/share/nginx/html
COPY nginx.conf.template /nginx.conf.template
CMD /bin/sh -c "envsubst < /nginx.conf.template > /etc/nginx/nginx.conf && nginx -g 'deamon off;'"
