FROM node:18-alpine3.18

WORKDIR /server
COPY package.json .
RUN npm install
COPY . .
EXPOSE 8080
CMD npm start
