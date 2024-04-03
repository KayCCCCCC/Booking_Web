FROM node:18-alpine3.18

WORKDIR /server
COPY package.json .
RUN npm install
COPY . .
CMD npm start

EXPOSE 3000