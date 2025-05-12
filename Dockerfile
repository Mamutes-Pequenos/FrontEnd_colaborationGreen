FROM node:20 AS build

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM nginx:1.26

COPY --from=build /app/dist/green-angular/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]