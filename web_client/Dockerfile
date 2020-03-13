#Builder environment
FROM node:12 AS builder
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY package*.json ./
RUN npm install --silent
RUN npm install react-scripts@3.0.1 -g --silent
COPY . .
RUN npm run build
CMD cp /var/lib/apk/client.apk /usr/src/app/public/client.apk ; npm start

#Production environment
#FROM nginx:1.16.0-alpine
#COPY --from=builder /usr/src/app/build /usr/share/nginx/html
#RUN rm /etc/nginx/conf.d/default.conf
#COPY nginx/nginx.conf /etc/nginx/conf.d
#EXPOSE 80
#RUN mkdir -p /usr/share/nginx/html/public
#CMD cp /var/lib/apk/client.apk /usr/share/nginx/html/public/client.apk ; nginx -g "daemon off;"