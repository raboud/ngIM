# Stage 1
FROM node:16-alpine as build-step
RUN mkdir -p /app
WORKDIR /app
COPY ../package.json /app
RUN npm install
COPY ../angular.json /app
COPY ../tsconfig.json /app
COPY ../tslint.json /app
COPY ../projects/ /app/projects
RUN npm run build-prod mat-lib
RUN npm run build-prod randr-lib
RUN npm run build-prod msal-lib
RUN npm run build-prod im-lib
RUN npm run build-prod im-app

# Stage 2
FROM nginx:alpine
COPY --from=build-step /app/dist/im-app /usr/share/nginx/html
COPY ../Nginx/nginx.conf /etc/nginx/nginx.conf

RUN ls /etc
EXPOSE 80
EXPOSE 443
