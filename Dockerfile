FROM node:16 as build

WORKDIR /user/src/app
COPY . ./
RUN npm install npm@latest -g
RUN npm install -g @angular/cli@14.2.3
RUN npm install
RUN ls -alh
RUN ng build
RUN mkdir /app && cp -r dist/afirix/ /app/

FROM nginx:1.21
COPY --from=build /app/afirix/ /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf