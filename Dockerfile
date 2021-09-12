FROM node:14

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN npm install -g @angular/cli
RUN npm install -g nodemon
COPY . .
EXPOSE 3000
CMD [ "node", "server.js" ]